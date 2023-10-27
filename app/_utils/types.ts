import Message from "@/app/_models/message"

export type MessageRole = "human" | "ai"

export type FormMessage  = {
  text: string
}

export type ChatResponse = {
  humanMessage: Message
  aiMessage: Message
}