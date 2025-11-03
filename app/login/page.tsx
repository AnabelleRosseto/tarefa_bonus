import Link from "next/link"
import LoginForm from "./(components)/login-form/login-form"

const LoginPage = () => {
  return <div className='p-3 bg-white dark:bg-neutral-900 rounded shadow mx-auto w-full' style={{ maxWidth: '300px' }}>
    <h2 className="text-center mb-2">
      Login
    </h2>
    <LoginForm />
    <footer className="text-center mt-4">
      
    </footer>
  </div>
}

export default LoginPage