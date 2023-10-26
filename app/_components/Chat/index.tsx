"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormMessage, Message } from "@/app/_utils/types"
import MessageComponent from "./Message"

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello, how can I help you?"},
    { role: "human", text: "I want to buy a new phone"},
    { role: "ai", text: "What kind of phone do you want to buy?"},
  ])
  const { register, handleSubmit, reset } = useForm<FormMessage>()

  function handleFormSubmit({ text }: FormMessage) {
    setMessages([...messages, { role: "human", text }])
    reset()
  }

  return (
    <div className="flex flex-col h-full rounded-md border w-full md:w-[768px]">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <MessageComponent key={index} message={message} />
        ))}
      </div>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex p-4">
        <input
          type="text"
          {...register("text", { required: true })}
          placeholder="Type your message here..."
          className="flex-1 px-4 py-2 mr-4 rounded-lg border border-gray focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Send
        </button>
      </form>
    </div>
  )
}