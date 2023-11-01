'use client';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  dataTagSymbol,
} from '@tanstack/react-query'


type User = {
  _id?: string;
  email?: string;
  username?: string;
  role?: string;
}

export default function Profile() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userDetail'], queryFn: async () => {
      const { data } = await axios.get('/api/users/userDetail')
      return data.data as User;
    }
  });

  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  if (isError) {
    return <div>Something went wrong</div>
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="text-2xl">Profile</h1>
      {/* <p className="text-xl text-white">{userData !== 'nothing yet' ?
        <Link href={`/profile/${userData}`}>{userData}</Link>
        : 'loading'}
      </p> */}

      {isLoading
        ? <p className="text-xl text-white">Loading...</p>
        :
        <ul>
          <li>User ID: <Link href={`/profile/${data?._id}`}>{data?._id}</Link></li>
          <li>Username: {data?.username}</li>
          <li>Email: {data?.email}</li>
        </ul>
      }
      <button
        className="bg-sky-500 p-2"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  )
}
