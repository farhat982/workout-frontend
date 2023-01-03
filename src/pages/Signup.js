import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form
      action=''
      className='signup'
      onSubmit={handleSubmit}
    >
      <h1>Signup</h1>
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
      <button disabled={isLoading}>Signup</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup
