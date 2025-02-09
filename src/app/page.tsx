"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const have =async ()=>{
    router.push("/login");
  }
  const want =async ()=>{ 
    router.push("/sign-up");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <button 
      onClick={have} 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
      Already have an account
      </button>
      <button 
      onClick={want} 
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
      Don't have an account
      </button>
    </div>
  );
}
