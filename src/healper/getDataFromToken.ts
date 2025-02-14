import { NextRequest } from "next/server";
import Jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string => {
    try {
        const token = request.cookies.get('token')?.value || "";
        const decoded = Jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        
        if (!decoded || typeof decoded !== "object" || !decoded.id) {
            throw new Error("Invalid token structure");
        }
        
        return decoded.id as string;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Token verification failed");
    }
};
