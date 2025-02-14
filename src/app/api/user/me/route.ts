import { getDataFromToken } from "@/healper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(req: NextRequest) {
    try {
        const userID = await getDataFromToken(req);
        const user = await User.findOne({ _id: userID }).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User found", data: user });
    } catch (error: unknown) {
        console.error("Error fetching user:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
