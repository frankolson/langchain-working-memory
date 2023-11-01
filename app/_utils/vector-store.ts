import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { InputValues, OutputValues, VectorStoreRetrieverMemory } from "langchain/memory"
import { Chroma } from "langchain/vectorstores/chroma"
import Message from "@/app/_models/message"
import { Document } from "langchain/document"

export async function createVectorStore() {
  return new Chroma(new OpenAIEmbeddings(), {
    collectionName: "working-memory",
    url: process.env.CHROMA_URL,
  })
}

export async function saveChatToVectorDB(userMessage: Message, aiMessage: Message): Promise<void> {
  const vectorStore = await createVectorStore()
  const document = new Document({
    metadata: {
      aiMessageId: aiMessage.id,
      userMessageId: userMessage.id,
    },
    pageContent: `Human: ${userMessage.text}\nAI: ${aiMessage.text}`,
  })
  await vectorStore.addDocuments([document])
}

export class CustomVectorStoreRetrieverMemory extends VectorStoreRetrieverMemory {
  async saveContext(_inputValues: InputValues, _outputValues: OutputValues): Promise<void> {
    // Skip automaticall saving
  }
}