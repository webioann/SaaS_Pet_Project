import mongoose from "mongoose";

const connect = async () => {
    // if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Mongo Connection successfully established.");
    } 
    catch (error) {
        throw new Error("Error connecting to Mongoose -->", error) 
    }
}

export default connect;