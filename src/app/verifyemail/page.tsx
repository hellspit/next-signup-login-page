"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = useCallback(async () => {
        try {
            const response = await axios.post("/api/user/verifyemail", { token });
            if (response.status === 200) {
                setVerified(true);
            } else {
                setError(true);
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error("Verification Error:", e.response?.data || e.message);
            } else {
                console.error("Unexpected Error:", e);
            }
            setError(true);
        }
    }, [token]); // `useCallback` ensures stable function reference

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]); // Include `verifyUserEmail` in dependency array

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? token : "No token provided"}</h2>
            
            {verified && (
                <div>
                    <h2 className="text-2xl text-green-500">Email verified successfully!</h2>
                    <Link href="/login" className="text-blue-500 underline">
                        Go to Login
                    </Link>
                </div>
            )}
            
            {error && (
                <div>
                    <h2 className="text-2xl text-red-500">Verification failed!</h2>
                    <Link href="/login" className="text-blue-500 underline">
                        Try Logging in
                    </Link>
                </div>
            )}
        </div>
    );
}
