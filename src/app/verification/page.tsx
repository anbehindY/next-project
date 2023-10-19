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
    const url = window.location.search
    const token = url.split("=")[1];
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post("api/users/verification", { token })
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
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1>Email Verification</h1>
      <h2>{token ? `${token}` : error && <p>{error}</p>}</h2>

      {verified && <div>
        <p>Your email is verified</p>
        <Link href="/login">
          Login
        </Link>
      </div>}
    </div>
  )
}
