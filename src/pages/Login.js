import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form
      action=''
      className='login'
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <input
        type='email'
        value={email}
        name='email'
        placeholder='Please enter your Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        name='password'
        placeholder='Please enter your password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
