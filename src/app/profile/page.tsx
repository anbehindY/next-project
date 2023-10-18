'use client';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Link from "next/link";


export default () => {
  const router = useRouter();
  const [userData, setUserData] = useState('nothing yet')
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUserData()
  }, [userData])

  const getUserData = async () => {
    try {
      const res = await axios.get('/api/users/userDetail')
      setUserData(res.data.data._id)
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="text-2xl">Profile</h1>
      <p className="text-xl text-white">{userData !== 'nothing yet' ?
        <Link href={`/profile/${userData}`}>{userData}</Link>
        : 'loading'}
      </p>
      <button
        className="bg-sky-500 p-2"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  )
}
