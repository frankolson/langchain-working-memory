import { ConversationChain } from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"

export function createChatChain() {
  const llm = new ChatOpenAI({})
  
  return new ConversationChain({ llm })
}