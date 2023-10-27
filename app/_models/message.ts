import { PrismaClient } from "@prisma/client";

type MessageRole = "human" | "ai"

export default class Message {
  text: string
  role: MessageRole

  private static _prismaClient: PrismaClient

  constructor(text: string, role: MessageRole) {
    this.text = text
    this.role = role
  }

  static async create(text: string, role: MessageRole) {
    const message = await this.prismaClient.message.create({
      data: { text, role }
    })
    return new Message(message.text, message.role as MessageRole)
  }

  static async all() {
    const messages = await this.prismaClient.message.findMany({
      orderBy: { createdAt: "asc" }
    })
    return messages.map(message => new Message(message.text, message.role as MessageRole))
  }

  private static get prismaClient() {
    if (!this._prismaClient) {
      this._prismaClient = new PrismaClient()
    }
    return this._prismaClient
  }
}