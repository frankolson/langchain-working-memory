import { ConversationChain } from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"
import Message from "@/app/_models/message"
import { BufferMemory, ChatMessageHistory } from "langchain/memory"
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema"

export function createChatChain(messages: Message[]) {
  const llm = new ChatOpenAI({})
  const memory = new BufferMemory({
    chatHistory: new ChatMessageHistory(formatMessages(messages)),
  })
  
  return new ConversationChain({ llm, memory, verbose: true })
}

function formatMessages(messages: Message[]): BaseMessage[] {
  return messages.map(message => {
    return message.role === "human"
      ? new HumanMessage(message.text)
      : new AIMessage(message.text)
  })
}