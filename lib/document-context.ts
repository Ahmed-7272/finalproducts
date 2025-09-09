// This file contains sample document content that will be used to provide context to the chatbot

export const documentContext = {
  services: {
    inboundAgent: {
      title: "Inbound Agent",
      description: "Handle incoming customer queries with superhuman intelligence and seamless call routing.",
      features: [
        "24/7 call answering",
        "Natural language understanding",
        "Intelligent call routing",
        "Customer intent detection",
        "Seamless CRM integration",
        "Call transcription and analysis"
      ]
    },
    outboundAgent: {
      title: "Outbound Agent",
      description: "Supercharge your sales team with AI agents that can make calls, qualify leads, and book meetings.",
      features: [
        "Automated cold calling",
        "Lead qualification",
        "Appointment scheduling",
        "Follow-up management",
        "Sales script optimization",
        "Performance analytics"
      ]
    },
    supportAgent: {
      title: "Support Agent",
      description: "Provide exceptional customer support with AI agents that can resolve issues and answer questions.",
      features: [
        "24/7 customer support",
        "Multi-language support",
        "Issue categorization",
        "Knowledge base integration",
        "Escalation management",
        "Customer satisfaction tracking"
      ]
    }
  },
  pricing: {
    starter: {
      name: "Starter",
      description: "Perfect for small businesses entering the AI revolution",
      monthlyPrice: 1,
      features: [
        "1 AI Agent (Inbound or Outbound)",
        "1,000 call minutes per month",
        "Basic AI analytics",
        "Email support",
        "Standard voice quality",
        "CRM integration (basic)",
        "Call recording",
        "Business hours support"
      ]
    },
    business: {
      name: "Business",
      description: "For growing companies ready to scale with AI",
      monthlyPrice: 1,
      features: [
        "3 AI Agents (All types included)",
        "3,000 call minutes per month",
        "Advanced AI analytics & insights",
        "Priority chat & email support",
        "Premium voice quality",
        "Full CRM integration",
        "Call recording & transcription",
        "Custom AI scripts"
      ]
    },
    enterprise: {
      name: "Enterprise",
      description: "For organizations requiring maximum AI capabilities",
      monthlyPrice: 999,
      features: [
        "Unlimited AI Agents",
        "10,000 call minutes per month",
        "Enterprise-grade analytics",
        "Dedicated account manager",
        "Ultra-premium voice quality",
        "Custom integrations",
        "Advanced security features",
        "24/7 priority support"
      ]
    }
  },
  faq: [
    {
      question: "How do AI call agents work?",
      answer: "Our AI call agents use advanced natural language processing to understand and respond to callers in real-time. They're powered by n8n automation, VAPI voice AI, and custom workflows designed by our lead developer Ahmed."
    },
    {
      question: "Can I customize the voice and personality of my AI agents?",
      answer: "Yes, all our plans allow for voice customization. You can select from various voice options and adjust the personality traits to match your brand identity."
    },
    {
      question: "How accurate are the AI agents in understanding different accents?",
      answer: "Our AI agents are trained on diverse speech patterns and can understand a wide range of accents with high accuracy. The system continuously improves through machine learning."
    },
    {
      question: "What happens if the AI can't handle a specific call?",
      answer: "If the AI detects it cannot adequately handle a situation, it will seamlessly transfer the call to a human agent based on your configured escalation protocols."
    },
    {
      question: "How do I integrate the AI agents with my existing systems?",
      answer: "We provide API integrations for popular CRM systems and can work with your technical team to establish custom integrations for your specific tech stack."
    },
    {
      question: "Is there a trial period available?",
      answer: "Yes, we offer a 14-day pilot program that allows you to experience our AI call agents in action with your actual business scenarios."
    }
  ],
  companyInfo: {
    name: "CallMint.tech",
    founded: 2023,
    mission: "To revolutionize business communications through intelligent AI call agents that deliver exceptional customer experiences.",
    team: [
      {
        name: "Ahmed",
        role: "Lead Developer",
        bio: "Expert in AI voice technologies and automation workflows."
      }
    ],
    contact: {
    phone: "+18202808433",
    email: "info@callmint.tech",
      address: "123 AI Innovation Center, Tech Park, Bangalore, India"
    }
  }
};

// Function to get all document context as a string for embedding
export function getDocumentContextString(): string {
  const context = documentContext;
  let contextString = "";
  
  // Add services information
  contextString += "SERVICES:\n";
  Object.values(context.services).forEach(service => {
    contextString += `${service.title}: ${service.description}\n`;
    contextString += "Features: " + service.features.join(", ") + "\n\n";
  });
  
  // Add pricing information
  contextString += "PRICING PLANS:\n";
  Object.values(context.pricing).forEach(plan => {
    contextString += `${plan.name} ($${plan.monthlyPrice}/month): ${plan.description}\n`;
    contextString += "Features: " + plan.features.join(", ") + "\n\n";
  });
  
  // Add FAQ information
  contextString += "FREQUENTLY ASKED QUESTIONS:\n";
  context.faq.forEach(item => {
    contextString += `Q: ${item.question}\nA: ${item.answer}\n\n`;
  });
  
  // Add company information
  contextString += "COMPANY INFORMATION:\n";
  contextString += `Name: ${context.companyInfo.name}\n`;
  contextString += `Founded: ${context.companyInfo.founded}\n`;
  contextString += `Mission: ${context.companyInfo.mission}\n`;
  contextString += "Team: " + context.companyInfo.team.map(member => `${member.name} (${member.role})`).join(", ") + "\n";
  contextString += `Contact: Phone: ${context.companyInfo.contact.phone}, Email: ${context.companyInfo.contact.email}\n`;
  
  return contextString;
}