import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "mongodb-polo",
    })
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    })
}