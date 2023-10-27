"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ChatResponse, FormMessage } from "@/app/_utils/types"
import MessageComponent from "./Message"
import Message from "@/app/_models/message"

export default function Chat() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])
  const { register, handleSubmit, reset, formState } = useForm<FormMessage>()
  const { isSubmitting, isValid } = formState

  async function handleFormSubmit({ text }: FormMessage) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      })
      
      if (response.ok) {
        const data = await response.json() as ChatResponse
        const { humanMessage, aiMessage } = data

        setMessages([...messages, humanMessage, aiMessage])
        reset()
      } else if (response.status === 402) {
        const data = await response.json()
        throw new Error(data.error)
      } else {
        throw new Error("Something went wrong when submitting your message, please try again later.")
      }
    } catch (error) {
      alert((error as Error).message)
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/api/chat')
        const data = await response.json() as Message[]

        setMessages(data)
      } catch (error) {
        alert((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [])

  return (
    <div className="flex flex-col h-full rounded-md border w-full md:w-[768px]">
      <div className="flex-1 p-4 overflow-y-auto">
        {isLoading && <p className="text-center">Loading...</p>}

        {!isLoading && messages.length === 0 && (
          <p className="text-center">No messages yet.</p>
        )}

        {!isLoading && messages.map((message, index) => (
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
          className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !isValid}
        >
          Send
        </button>
      </form>
    </div>
  )
}