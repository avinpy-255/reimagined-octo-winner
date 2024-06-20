import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import {Task} from "../models/taskSchema.js"

export const createTask = catchAsyncErrors(async(req, res, next)=> {
    const {title, description} = req.body;
    const createdBy = req.user._id;
    const task = await Task.create({title, description, createdBy});
    res.status(200).json({
        success: true,
        task,
        message: "task created", 
    })
})
export const deleteTask = catchAsyncErrors(async(req,res, next)=> {
    const { id } = req.params;
    const task = await Task.findById(id);
    if(!task){
        return next(new ErrorHandler("task not found", 400));
    }
    await task.deleteOne()
    res.status(200).json({
        success: true,
        message: "task deleted", 
    })
})
export const updateTask = catchAsyncErrors(async(req,res, next)=>{})
export const getMyTask = catchAsyncErrors(async(req,res, next)=>{})
export const getSingleTask = catchAsyncErrors(async(req,res, next)=>{})