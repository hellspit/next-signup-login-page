"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
export default function Loginpage()
{
    const router=useRouter();
    const [user,setUser]=React.useState({email:"",password:"",username: ""});
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0)
        {
            setButtonDisabled(false);
        }else{  
            setButtonDisabled(true);
        }
    }
    ,[user]);
    const onSignUp=async()=>{};

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <hr className="w-1/2 my-4" />
    
        <div className="flex flex-col w-1/3">
            <label htmlFor="username" className="block mb-2 font-medium">Username</label>
            <input
                type="text"
                placeholder="Username"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="p-2 border rounded mb-4  text-black"
            />
    
            <label htmlFor="password" className="block mb-2 font-medium">Password</label>
            <input
                type="password"
                placeholder="Password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="p-2 border rounded mb-4 text-black"
            />
    
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
                type="email"
                placeholder="Email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="p-2 border rounded mb-4 text-black"
            />

            <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled? "Please fill all fields" : "Sign Up"}
            </button>
            <Link href="/login">Visit</Link>
        </div>
    </div>
    
    )
}