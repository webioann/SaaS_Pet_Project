import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_DB_URI as string);
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
    },
    { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;