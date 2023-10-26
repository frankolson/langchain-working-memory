import Chat from '@/app/_components/Chat'

// Home page that has a chat interface used to communicate with the bot
export default function Home() {
  return (
    <main className='flex flex-col items-center justify-stretch h-full p-4 sm:p-2'>
      <Chat />
    </main>
  )
}
