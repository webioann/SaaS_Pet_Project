import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_DB_URI as string);
mongoose.Promise = global.Promise;

const postsSchema = new Schema({
    text: {type: String, require: true},
    username: {type: String, require: true},
    desc: {type: String, require: true},
    image:{type: String, require: true}
    },
    { timestamps: true }
);
const Posts = mongoose.models.Posts || mongoose.model("Posts", postsSchema)
export default Posts;

