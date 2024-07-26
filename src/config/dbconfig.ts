// DB CONNECTION
import mongoose from "mongoose";

function dbConfig(){
    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL environment variable is not defined");
    }
    
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB connected to the backend successfully");
        })
        .catch((err: Error) => console.log(err));
}

export default dbConfig;