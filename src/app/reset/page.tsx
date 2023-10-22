'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default () => {
  const router = useRouter()
  const [user, setUser] = useState({ email: '' })
  const [loading, setLoading] = useState(false)

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true)
      await axios.post('/api/users/reset', user)
      toast.success('Please check your email')
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-start bg-yellow-500 h-screen pt-24 text-black'>
      <h1>{loading && 'Finding your account...'}</h1>
      <form onSubmit={submitHandler} className='flex flex-col items-center'>
        <label htmlFor="email" className='mr-auto pb-1'>Email</label>
        <input id='email' placeholder='Enter email' type='email' value={user.email} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({ ...user, email: e.target.value })} />
        <button type='submit' className='p-2 bg-sky-950 text-slate-300 rounded-md mt-4'>Find account</button>
      </form>
    </div>
  )
}
