import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandeler from '../middlewares/error.js'
import cloudinary from 'cloudinary'
import {User} from '../models/userSchema.js'

export const register = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandeler("user avatar required!", 400));
    }
    const {avatar} = req.files;
    const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
    ];
    if(!allowedFormats.includes(avatar.mimetype)){
        return next(
            new ErrorHandeler(
                "user avatat must be in one of the following formats: " + allowedFormats.join(", "),
                400
            )
        )
    }
    const {username, email, phone, password } = req.body;
    if(!username || !email || !phone || !password){
        return next(new ErrorHandeler("please provide all the required fields!", 400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandeler("user already exists!", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath)
    if(!cloudinaryResponse || cloudinary.error){
        return next(new ErrorHandeler(cloudinary.error.message, 400));
    }
    user = await User.create({
        username,
        email,
        phone,
        password,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    })
    res.status(200).json({
        success: true,
        message: "userRegistered"
    })
})
export const login = catchAsyncErrors(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email ||!password){
        return next(new ErrorHandeler("please provide all the required fields!", 400));
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new ErrorHandeler("email not find", 400));
    }
   const isPasswordMatched = await user.comparePassword(password)
   if(!isPasswordMatched){
    return next(new ErrorHandeler("password not matched", 400));
   }
    res.status(200).json({
        success: true,
        message: "userLoggedIn",
        user
    })
})
export const logout = catchAsyncErrors((req, res, next) => {})
export const myProfile = catchAsyncErrors((req, res, next) => {})

//i have examas right now so that i'll pause here