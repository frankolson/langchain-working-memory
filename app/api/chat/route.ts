import { NextResponse } from "next/server"
import { Message } from "@/app/_utils/types"

export async function POST(request: Request) {
  const body = await request.json()
  const { text } = body
  
  const humanMessage: Message = { role: "human", text }
  const aiMessage: Message = {
    role: "ai",
    text: `AI response to: "${text}"`, 
  }

  return NextResponse.json({ humanMessage, aiMessage }, { status: 201 })
}