import exp from "constants";
import { NextResponse } from "next/server";


export  async function GET()
{
    try{
        const response= NextResponse.json({
            message:"logout success",
            success:true

        })
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;    
        

    }catch(error:any){
        console.log("logout fail",error.message);
    }
}