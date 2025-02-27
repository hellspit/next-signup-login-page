"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false); // Now used in UI

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await Axios.post("/api/user/login", user);
            console.log("Login success:", response.data);
            router.push("/profile/");
        } catch (error: unknown) {
            console.error("Login failed:", error);

            if (error instanceof Error) {
                console.error("Error message:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Log-in</h1>
            <hr className="w-1/2 my-4" />

            <div className="flex flex-col w-1/3">
                <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="p-2 border rounded mb-4 text-black"
                />

                <label htmlFor="password" className="block mb-2 font-medium">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="p-2 border rounded mb-4 text-black"
                />

                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={`p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 
                        ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    {loading ? "Logging in..." : buttonDisabled ? "Please fill all fields" : "Login"}
                </button>

                <button
                    onClick={() => router.push("/sign-up")}
                    className="text-blue-500 hover:underline"
                >
                    Want to sign up?
                </button>
            </div>
        </div>
    );
}
