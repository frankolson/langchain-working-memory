import { ConversationChain } from "langchain/chains"
import {
  BufferMemory,
  ChatMessageHistory,
  CombinedMemory,
  VectorStoreRetrieverMemory
} from "langchain/memory"
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema"
import { ChatOpenAI } from "langchain/chat_models/openai"
import Message from "@/app/_models/message"
import { createVectorStore } from "@/app/_utils/vector-store"
import { PromptTemplate } from "langchain/prompts"

const DEFAULT_TEMPLATE = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Relevant pieces of previous conversations (You do not need to use these if not relevant):
{history}

Current conversation:
{current_conversation}
Human: {input}
AI:`

export async function createChatChain(messages: Message[]) {
  const llm = new ChatOpenAI({})
  const prompt = createPrompt()
  const shortTermMemory = createShortTermMemory(messages)
  const longTermMemory = await createLongTermMemory()
  const memory = new CombinedMemory({
    memories: [shortTermMemory, longTermMemory],
  })
  
  return new ConversationChain({ llm, prompt, memory, verbose: true })
}

function createPrompt() {
  return new PromptTemplate({
    template: DEFAULT_TEMPLATE,
    inputVariables: ["input", "history", "current_conversation"],
  })
}

function createShortTermMemory(messages: Message[]) {
  const history = formatMessages(messages)

  return new BufferMemory({
    chatHistory: new ChatMessageHistory(history),
    memoryKey: "current_conversation",
    inputKey: "input",
  })
}

async function createLongTermMemory() {
  const vectorStore = await createVectorStore()
  
  return new VectorStoreRetrieverMemory({
    vectorStoreRetriever: vectorStore.asRetriever(5),
    memoryKey: "history",
    inputKey: "input",
  })
}

function formatMessages(messages: Message[]): BaseMessage[] {
  return messages.map(message => {
    return message.role === "human"
      ? new HumanMessage(message.text)
      : new AIMessage(message.text)
  })
}