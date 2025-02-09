import { NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try{
       const token = request.cookies.get('token')?.value || "";
       const decoded:any = Jwt.verify(token, process.env.TOKEN_SECRET!)
        return decoded.id;

    }catch(error:any){
        throw new Error(error.message);
    }
}