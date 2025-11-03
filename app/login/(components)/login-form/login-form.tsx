'use client'

import Button from "@/components/button/button"
import Input from "@/components/input/input"
import useForm, { FormState } from "@/hooks/use-form/use-form"
import { useRouter } from "next/navigation"
import { useRef } from 'react'

const LoginForm = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>
  const initialLoginForm = {
    email: '',
    password: ''
  }
  const {
    data: {
      email,
      password
    },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errorsCount
  } = useForm(
    formRef,
    initialLoginForm,
    submitCallback,
    submitErrorCallback
  )

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = 'Erro ao realizar login:\n\n'

      for (const key in error.cause) {
        const causes = error.cause as { [key: string]: string[]}
        message += `- ${causes[key]}\n`
      }

      return window.alert(message)
    }

    return window.alert(error.message)
  }

  async function submitCallback(values: FormState) {
    try {
      const request = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const response = await request.json()

      if (!response.token) {
        throw new Error(response.message)
      }

  localStorage.setItem('token', response.token)

  router.push('/blackjack')
    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error)
      }
      return submitErrorCallback(new Error('Erro desconhecido ao tentar logar.', { cause: error }))
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Input
        label='E-mail'
        type='email'
        name='email'
        id='email'
        placeholder='E-mail'
        value={email}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Input
        label='Senha'
        type='password'
        name='password'
        id='password'
        placeholder='Senha'
        disabled={false}
        minLength={6}
        value={password}
        handleChange={(_, e) => handleChange(e)}
        readOnly={loadingSubmit}
        required
      />
      <Button type='submit' disabled={loadingSubmit || !!errorsCount || !formRef.current}>
        {
          loadingSubmit
            ? 'Carregando...'
            : 'Entrar'
        }
      </Button>
    </form>
  )
}

export default LoginForm