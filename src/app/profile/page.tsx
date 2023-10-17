'use client';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default () => {
  const router = useRouter();
  const logout = () => {
    try {
      axios.get('/api/users/logout')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <button
        className="bg-sky-500 p-2"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
