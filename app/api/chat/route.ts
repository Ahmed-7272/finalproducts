import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getDocumentContextString } from '@/lib/document-context';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // API key from environment variable
});

// Get document context
const documentContext = getDocumentContextString();

// Define the system message that provides context about your documents
const systemMessage = {
  role: 'system',
  content: `You are an AI assistant for Callmint.Tech, a company that provides AI agents & custom AI systems for business communications.
  
  About Callmint.Tech:
  - Callmint.Tech offers three types of AI agents: Inbound Agent (handles incoming customer queries with superhuman intelligence), Outbound Agent (boosts sales teams with AI agents), and Support Agent (delivers exceptional customer support with AI).
  - The service is powered by n8n automation, VAPI voice AI, and advanced workflows.
  - The company offers different pricing plans: Starter ($299/month), Business ($499/month), and Enterprise (Custom Pricing).
  - The team includes Ahmed (Lead AI & Web Engineer), Ayaz (CEO & Founder), and Ahmed (Business Partner).
  - The company was founded in 2025.
  
  Use the following document context to answer questions accurately:
  
  ${documentContext}
  
  Your task is to help users understand Callmint.Tech's services, answer questions about pricing, and explain how the AI call agents work. Be friendly, professional, and helpful. If you don't know the answer to a question, admit it and suggest contacting the sales team at info@callmint.tech or +91 82176 87679 for more information.`
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Prepare the messages for the OpenAI API
    const apiMessages = [
      systemMessage,
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // You can change this to a different model if needed
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000, // Increased token limit for better voice chat responses
    });

    // Extract the assistant's message from the response
    const assistantMessage = completion.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}