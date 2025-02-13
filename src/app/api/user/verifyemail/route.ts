import {connect} from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";


connect();

export async function post(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user=User.findOne({verifyToken:token,
            verifyTokenExpire:{$gt:Date.now()}
        })

        if(!user){
            return NextResponse.json({error:'Invalid or expired token'},{status:401});
        }
        console.log(user);
        user.isVerfided=true;
        user.verifyToken=undefined;
        user.verifyTokenExpire=undefined;
        await user.save();
        return NextResponse.json({message:'Email verified successfully'},{status:200});


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500});
    }
}
