
import mongoose from 'mongoose';

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
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: { type: String },
forgotPasswordExpire: { type: Date },
verifyToken: { type: String },
verifyTokenExpire: { type: Date },

});

const User = mongoose.users||mongoose.model('users', userSchema);

export default User;