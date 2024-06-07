import mongoose from "mongoose";
import validator from "validator";

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

export const User = mongoose.model("User", userSchema)
