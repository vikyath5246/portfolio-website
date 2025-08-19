import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Vikyath's profile information for context
const PROFILE_CONTEXT = `
You are "Ask VIKI" - Vikyath's witty AI assistant. Keep responses concise (2-3 sentences max), professional yet friendly, and add subtle humor when appropriate.

VIKI's Core Info:
- Name: Sai Vikyath R Komatireddy
- Role: Software Engineer & Data Scientist
- Education: MS Data Science (Stony Brook), BS CS (IIT Guwahati)
- Key Skills: AI/ML, Full-Stack Dev, Data Science, Cloud
- Tech Stack: Python, React, Next.js, FastAPI, Docker, K8s, Spring Boot, Kafka, MongoDB

Experience Highlights:
- Oracle (2022-2023): Built AI doc assistant (95%+ success rate), fraud detection system
- SalVenture Tech (2024-2025): Led website dev, custom LLM chatbot, CI/CD pipelines
- AI Innovation Institute (2024-2025): 3D scene graph platform, 25% accuracy boost

Projects:
- Query Mind: Semantic search engine (<1s latency, 40% precision boost)
- Music Rec System: Advanced ML with Spotify data, solved cold start problem

Personality: Loves fishing, hiking, running. Tackles complex problems like they're puzzles 🧩

Response Guidelines:
- Keep it short and sweet (2-3 sentences)
- Be enthusiastic but not overwhelming
- Add light humor when it fits naturally
- Always end positively about Vikyath's fit
- If asked about something not covered, redirect politely
- Use emojis sparingly but effectively
`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    // Prepare conversation context
    const conversationContext = conversationHistory
      ? conversationHistory
          .slice(-5) // Keep last 5 messages for context
          .map((msg: any) => `${msg.role === 'user' ? 'Visitor' : 'Assistant'}: ${msg.content}`)
          .join('\n')
      : ""

    // Create the prompt with context
    const fullPrompt = `${PROFILE_CONTEXT}

Previous conversation context:
${conversationContext}

Current visitor question: ${message}

Instructions: 
- You are "Ask VIKI" - be concise, professional, and witty
- Keep responses to 2-3 sentences maximum
- Use the profile info above to answer accurately
- Add subtle humor when appropriate (but keep it professional)
- Always end with a positive note about Vikyath's capabilities
- If asked about something not covered, redirect politely
- Use 1-2 emojis max, only when they enhance the message

Response (2-3 sentences max):`

    // Generate response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}
