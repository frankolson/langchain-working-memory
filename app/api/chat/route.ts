import { NextResponse } from "next/server"
import { Message } from "@/app/_utils/types"
import { createChatChain } from "@/app/_utils/chain"

export async function POST(request: Request) {
  const body = await request.json()
  const { text } = body
  
  const humanMessage: Message = { role: "human", text }
  const { response } = await createChatChain().call({ input: humanMessage.text })
  const aiMessage: Message = { role: "ai", text: response }

  return NextResponse.json({ humanMessage, aiMessage }, { status: 201 })
}