import { NextResponse } from "next/server"

type LoginResponse = {
  token?: string
  message?: string
}

interface LoginBody {
  email: string
  password: string
}

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginBody = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    if (email === 'teste@gmail.com' && password === '123456') {
      return NextResponse.json({ token: 'fake-jwt-token', message: "Login successful" })
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({
      message
    })
  }
}
