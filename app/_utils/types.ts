export interface Message {
  role: "human" | "ai"
  text: string
}

export interface FormMessage {
  text: string
}