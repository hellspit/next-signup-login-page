"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
export default function SignUp()
{
    const [user,setUser]=React.useState({email:"",password:""});
    const onLogin=async()=>{};

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold">Log-in</h1>
        <hr className="w-1/2 my-4" />
    
        <div className="flex flex-col w-1/3">
          
    
            
    
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
                type="email"
                placeholder="Email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="p-2 border rounded mb-4"
            />
            <label htmlFor="password" className="block mb-2 font-medium">Password</label>
            <input
                type="password"
                placeholder="Password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="p-2 border rounded mb-4"
            />

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Log-in
            </button>
            <Link href="/sign-up">Visit</Link>
        </div>
    </div>
    
    )
}