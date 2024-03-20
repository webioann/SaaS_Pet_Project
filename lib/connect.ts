import mongoose from "mongoose";

const connect = async () => {
    // if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGO_DB_URI!)
        console.log("Mongo Connection successfully established.");
    } 
    catch (error) {
        throw new Error("Error connecting to Mongoose -->", error) 
    }
}

export default connect;