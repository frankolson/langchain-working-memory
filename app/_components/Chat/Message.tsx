import Message from "@/app/_models/message"

interface Props {
  message: Message
}

export default function MessageComponent({ message }: Props) {
  return (
    <div
      className={`flex items-end ${
        message.role === "human" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {message.role === "ai" && (
        <b className="mr-2">AI</b>
      )}
      
      <div
        className={`px-4 py-2 rounded-lg whitespace-pre-wrap ${
          message.role === "human"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {message.text}
      </div>

      {message.role === "human" && (
        <b className="ml-2">Me</b>
      )}
    </div>
  )
}