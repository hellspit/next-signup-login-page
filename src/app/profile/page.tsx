"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("NOTHING");

    const logout = async () => {
        try {
            await axios.get("/api/user/logout");
            toast.success("Logged out successfully");   
            router.push("/login");
        } catch (error: unknown) {       
            console.error("Logout error:", error);
        }
    };

    const getuserDetails = async () => {
        try {
            const res = await axios.get("/api/user/me");
            console.log(res.data);
            setData(res.data.data.username);
        } catch (error: unknown) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <p className="text-lg mb-4">Welcome to your profile!</p>
            
            <button 
                className="text-xl mb-4 bg-transparent text-blue-500 underline"
                onClick={() => data !== 'NOTHING' && router.push(`/profile/${data}`)}
            >
                {data === 'NOTHING' ? "No User Data" : `Profile: ${data}`}
            </button>
            
            <button 
                onClick={logout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
            >
                Logout
            </button> 

            <button 
                onClick={getuserDetails}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                User Details
            </button>  
        </div>
    );
}
