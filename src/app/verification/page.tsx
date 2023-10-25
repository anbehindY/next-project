'use client'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function Verification() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const encodedToken = window.location.search.split("=")[1];
    const token = decodeURIComponent(encodedToken);
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post("/api/users/verification", { token })
        .then((res) => {
          toast.success(res.data.message);
          setVerified(true);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      <h1 className="text-2xl font-semibold">Email Verification</h1>
      {
        token ?
          <h2 className="bg-green-600 p-2 text-black rounded-lg mt-6">{token}</h2> :
          <h2 className="bg-red-600 p-2 text-black rounded-lg mt-6">{error && <p>{error}</p>}</h2>
      }

      {verified && <div className="flex flex-col gap-4 items-center justify-center">
        <p>Your email is verified</p>
        <Link href="/login" className="bg-green-600 p-2 text-center w-20">
          Login
        </Link>
      </div>}
    </div>
  )
}
