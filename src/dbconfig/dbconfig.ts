import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

export async function connect() {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("✅ Connected to MongoDB");
        });

        connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err);
            process.exit(1); // Exit if there's a connection error
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Exit on failure
    }
}
