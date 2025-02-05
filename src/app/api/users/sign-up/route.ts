import {connect} from "@/dbconfig/dbconfig";
import user from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjd from "bcryptjs";


connect()

export async function post(req: NextRequest) {
try {   
    const reqBody = await req.json();
    const {username, email, password} = reqBody;
    const User = await user.findOne({email});

    if(User) {
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }
    const salt = await bcryptjd.genSalt(10);
    const hashedPassword = await bcryptjd.hash(password, salt);
    const newUser = new user({username, email, password: hashedPassword});
    const savedUser=await newUser.save();
    console.log(savedUser);
    return NextResponse.json({message: "User created successfully",
        success:true,
        savedUser
    }
    )

} catch (error:any) {
    console.log(error)
    return NextResponse.json({error: error.message}, {status: 500})
}
}