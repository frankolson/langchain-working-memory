import { PrismaClient } from "@prisma/client"

type MessageRole = "human" | "ai"

export default class Message {
  id?: number
  text: string
  role: MessageRole

  private static _prismaClient: PrismaClient

  constructor(text: string, role: MessageRole, id?: number) {
    this.text = text
    this.role = role
    this.id = id
  }

  static async create(text: string, role: MessageRole) {
    const message = await this.prismaClient.message.create({
      data: { text, role }
    })
    return new Message(message.text, message.role as MessageRole, message.id)
  }

  static async all() {
    const messages = await this.prismaClient.message.findMany({
      orderBy: { createdAt: "asc" }
    })
    return messages.map(message => new Message(message.text, message.role as MessageRole, message.id))
  }

  static async last(count: number) {
    const messages = await this.prismaClient.message.findMany({
      orderBy: { createdAt: "desc" },
      take: count
    })
    return messages.map(message => new Message(message.text, message.role as MessageRole, message.id))
  }

  private static get prismaClient() {
    if (!this._prismaClient) {
      this._prismaClient = new PrismaClient()
    }
    return this._prismaClient
  }
}