import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Chroma } from "langchain/vectorstores/chroma"

export async function createVectorStore() {
  return new Chroma(new OpenAIEmbeddings(), {
    collectionName: "working-memory",
    url: process.env.CHROMA_URL,
  })
}