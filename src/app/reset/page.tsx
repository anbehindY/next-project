'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export const page = () => {
  const [user, setUser] = useState({ email: ''})

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
		<div className='flex flex-col items-center justify-start bg-yellow-500 h-screen pt-24 text-black'>
      <form onSubmit={submitHandler} className='flex flex-col items-center'>
				<label htmlFor="email" className='mr-auto pb-1'>Email</label>
				<input id='email' placeholder='Enter email' type='email' value={user.email} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({ ...user, email: e.target.value })} />
				<button type='submit' className='p-2 bg-sky-950 text-slate-300 rounded-md mt-4'>Find account</button>
			</form>
    </div>
  )
}
