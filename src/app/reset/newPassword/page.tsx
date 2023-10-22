'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function NewPassword() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const URL = window.location.search;
    setToken(URL.split('=')[1])
  }, [])

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      if (token) {
        setLoading(true)
        await axios.post('/api/users/reset/newPassword', { token, password })
        toast.success('Password reset successfully')
        router.push('/login')
      }
    } catch (error: any) {
      toast.error(error.message)
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-start bg-yellow-500 h-screen pt-24 text-black'>
     <h1>{loading && 'Resetting your password...'}{token}</h1>
      <form onSubmit={submitHandler} className='flex flex-col items-center'>
        <label htmlFor="password" className='mr-auto pb-1'>New password</label>
        <input id='password' placeholder='Enter password' type='password' value={password} className='mb-2 rounded-sm px-2 py-1' onChange={e => setPassword(e.target.value)} />

        <label htmlFor="password" className='mr-auto pb-1'>Confirm password</label>
        <input id='password' placeholder='Enter password' type='password' value={confirmPassword} className='mb-2 rounded-sm px-2 py-1' onChange={e => setConfirmPassword(e.target.value)} />
        <button type='submit' className='p-2 bg-sky-950 text-slate-300 rounded-md mt-4'>Submit</button>
      </form>
    </div>
  )
}
