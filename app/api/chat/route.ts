import { NextResponse } from "next/server"
import { createChatChain } from "@/app/_utils/chain"
import Message from "@/app/_models/message"

export async function GET() {
  return NextResponse.json(await Message.all())
}

export async function POST(request: Request) {
  const body = await request.json()
  const { text: input } = body
  
  const chatHistory = await Message.last(12)
  const result = await createChatChain(chatHistory.reverse()).call({ input })
  console.log(result)
  
  const humanMessage = await Message.create(input, "human")
  const aiMessage = await Message.create(result.response, "ai")
  
  return NextResponse.json({ humanMessage, aiMessage }, { status: 201 })
}