import { ReactNode } from "react"

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <div className="flex flex-col gap-1 justify-center content-center h-full">
    <header className="text-center px-2">
      <h1 className="text-xl">
        Bem-vindo ao FIAP Next.js
      </h1>
    </header>
    <main className="px-2">
      {children}
    </main>
  </div>
}

export default LoginLayout