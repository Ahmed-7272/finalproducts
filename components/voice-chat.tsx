"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Play, Square, Volume2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VoiceChatProps {
  onSendMessage: (message: string) => void
  isProcessing: boolean
  lastAssistantMessage: string | null
}

export function VoiceChat({ onSendMessage, isProcessing, lastAssistantMessage }: VoiceChatProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)
  
  // Check browser compatibility on mount
  useEffect(() => {
    const checkCompatibility = () => {
      const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
      const isMediaDevicesSupported = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices
      const isSpeechSynthesisSupported = 'speechSynthesis' in window
      
      setIsSupported(isSpeechRecognitionSupported && isMediaDevicesSupported && isSpeechSynthesisSupported)
      
      if (!isSpeechRecognitionSupported) {
        setError("Speech recognition is not supported in this browser. Try Chrome or Safari.")
      } else if (!isMediaDevicesSupported) {
        setError("Microphone access is not supported in this browser.")
      } else if (!isSpeechSynthesisSupported) {
        setError("Text-to-speech is not supported in this browser.")
      }
    }
    
    checkCompatibility()
    
    // Clean up on unmount
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          console.error("Error stopping recognition:", e)
        }
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop()
        } catch (e) {
          console.error("Error stopping media recorder:", e)
        }
      }
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Handle recording start/stop
  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const startRecording = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      // Set up speech recognition if available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognitionRef.current = recognition
        
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US' // Set language explicitly
        
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          
          setTranscript(transcript)
        }
        
        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setError(`Speech recognition error: ${event.error}. Try again.`)
        }
        
        recognition.onend = () => {
          // Restart recognition if we're still recording
          if (isRecording && recognitionRef.current) {
            try {
              recognition.start()
            } catch (e) {
              console.error("Error restarting recognition:", e)
            }
          }
        }
        
        try {
          recognition.start()
        } catch (e) {
          console.error("Error starting recognition:", e)
          setError("Could not start speech recognition. Please try again.")
        }
      }
      
      // Start recording
      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      setError("Could not access your microphone. Please check your browser permissions.")
    }
  }

  const stopRecording = () => {
    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.error("Error stopping recognition:", e)
      }
      recognitionRef.current = null
    }
    
    // Stop media recorder
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop()
      } catch (e) {
        console.error("Error stopping media recorder:", e)
      }
      setIsRecording(false)
      
      // Send the transcript as a message
      if (transcript) {
        onSendMessage(transcript)
        setTranscript("")
      }
      
      // Stop all tracks in the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorderRef.current = null
    }
  }

  // Text-to-speech for assistant responses
  useEffect(() => {
    if (lastAssistantMessage && !isSpeaking && !isRecording) {
      speakMessage(lastAssistantMessage)
    }
  }, [lastAssistantMessage, isSpeaking, isRecording])
  
  // Cancel speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(text)
        speechSynthesisRef.current = utterance
        
        // Get available voices
        let voices = window.speechSynthesis.getVoices()
        
        // If voices array is empty, wait for voices to load
        if (voices.length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices()
            setVoiceAndSpeak(utterance, voices)
          }
        } else {
          setVoiceAndSpeak(utterance, voices)
        }
      } catch (e) {
        console.error("Error with speech synthesis:", e)
        setError("Could not use text-to-speech. Please try again.")
        setIsSpeaking(false)
      }
    }
  }
  
  const setVoiceAndSpeak = (utterance: SpeechSynthesisUtterance, voices: SpeechSynthesisVoice[]) => {
    // Try to find a good English voice
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('en-') && (voice.name.includes('Google') || voice.name.includes('Natural'))
    ) || voices.find(voice => voice.lang.includes('en-'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    utterance.rate = 1.0 // Normal speed
    utterance.pitch = 1.0 // Normal pitch
    utterance.volume = 1.0 // Full volume
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
      setError("Text-to-speech error. Please try again.")
    }
    
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 glass-card rounded-xl border border-white/20 w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Mic className="w-4 h-4" /> Voice Chat Mode
      </h3>
      
      {error && (
        <Alert variant="destructive" className="bg-red-900/30 border border-red-500/50 text-white w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
      
      {!isSupported && (
        <div className="text-sm text-amber-300 max-w-xs text-center">
          <p>Voice chat may not be fully supported in your browser. For best experience, use Chrome on desktop or Safari on iOS.</p>
        </div>
      )}
      
      <div className="flex items-center space-x-4 justify-center w-full">
        <Button
          onClick={toggleRecording}
          disabled={isProcessing || isSpeaking || !isSupported}
          className={`rounded-full w-14 h-14 ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-gradient-to-r from-neon-blue to-neon-purple'}`}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
        
        {isSpeaking && (
          <Button
            onClick={stopSpeaking}
            className="rounded-full w-14 h-14 bg-amber-500 hover:bg-amber-600"
            aria-label="Stop speaking"
          >
            <Square className="w-6 h-6" />
          </Button>
        )}
        
        {!isSpeaking && lastAssistantMessage && (
          <Button
            onClick={() => speakMessage(lastAssistantMessage)}
            className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600"
            aria-label="Play last response"
            disabled={isRecording || isProcessing}
          >
            <Volume2 className="w-6 h-6" />
          </Button>
        )}
      </div>
      
      {transcript && isRecording && (
        <div className="text-sm text-white/80 max-w-xs text-center bg-dark-800/50 p-3 rounded-lg w-full">
          <p className="font-semibold">Listening:</p>
          <p className="italic">{transcript}</p>
        </div>
      )}
      
      <div className="text-xs text-white/60 text-center">
        {isRecording ? "Click the microphone again to send" : "Click the microphone to start speaking"}
      </div>
    </div>
  )
}

// Add TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}