import mongoose, { Schema } from "mongoose";

export interface IUserModelSchema {
    name: string 
    email: string
    password: string 
    image: string | null 
    provider: 'google' | 'credentials'
    accountCreated: number
}

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const userSchema = new Schema<IUserModelSchema>({
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    image: String, 
    provider: String,
    accountCreated: { type: Number, required: true },
    },
    { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;