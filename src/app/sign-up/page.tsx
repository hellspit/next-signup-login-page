"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "", username: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username));
    }, [user]);

    const onSignUp = async () => {
        try {
            const res = await axios.post("/api/user/sign-up", user);
            console.log("Signup Successful:", res.data);
            toast.success("Signup successful! Redirecting...");
            setTimeout(() => router.push("/login"), 1500);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error("Signup Error:", e.response?.data || e.message);
                toast.error(e.response?.data?.error || "Something went wrong");
            } else {
                console.error("Unexpected Error:", e);
                toast.error("An unexpected error occurred");
            }
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <hr className="w-1/2 my-4" />

            <div className="flex flex-col w-1/3">
                <label htmlFor="username" className="block mb-2 font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="p-2 border rounded mb-4 text-black"
                />

                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="p-2 border rounded mb-4 text-black"
                />

                <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="p-2 border rounded mb-4 text-black"
                />

                <button
                    onClick={onSignUp}
                    disabled={buttonDisabled}
                    className={`p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 
                        ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    {buttonDisabled ? "Please fill all fields" : "Sign Up"}
                </button>

                <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Log in</Link>
            </div>
        </div>
    );
}
