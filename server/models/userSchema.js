import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, ],
        minLength: [6, "at least 6 characters"],
        maxLength: [10, "maximum only 10 characters"]
    },
    
    password: {
        type: String,
        require: [true, ],
        minLength: [8, "at least 8 characters"],
        maxLength: [30, "maximum only 30 characters"]
    },

    email: {
        type: String,
        require: [true, "please provide your email" ],
        unique: [true, "user already exists"],
        validate: [validator.isEmail, "provide your valid email"]
    },

    phone: {
        type: Number,
        require: [true, "please provide your phone number"]
    },
    avatar: {
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        }
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWTTokens = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User", userSchema)
