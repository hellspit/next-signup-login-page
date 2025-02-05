import exp from 'constants';
import mongoose from 'mongoose';
import { type } from 'os';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },  
    isVerfided: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: string,
    forgotPasswordExpire: Date,
    verifyToken: string,
    verifyTokenExpire: Date,
});

const User = mongoose.users||mongoose.model('users', userSchema);

export default User;