import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const AIChat = dynamic(() => import('./components/AIChat'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">AI App 2025</h1>
        
        <SignedIn>
          <div className="bg-white/30 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Future of AI</h2>
            <AIChat />
        
        <SignedOut>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <SignIn />
          </div>
        </SignedOut>
      </div>
    </main>
  )
}
