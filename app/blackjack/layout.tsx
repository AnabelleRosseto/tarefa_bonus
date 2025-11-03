'use client'
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface GameLayoutProps {
    children: ReactNode
}

const GameLayout = ({ children }: GameLayoutProps) => {
    const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return <div className="flex flex-col gap-1 justify-start content-start min-h-screen">
    <header className="flex flex-row justify-around content-center text-center p-2">
      <h1 className=" text-xl text-blue-500">
        Vinte e Um
      </h1>
      <button className="text-xl text-gray-900 dark:text-gray-100 bg-neutral-100 dark:bg-neutral-800 " onClick={logout}>Logout</button>
    </header>
    <main className="px-2">
      {children}
    </main>
  </div>
}
export default GameLayout