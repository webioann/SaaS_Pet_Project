import mongoose from "mongoose";

const { Schema } = mongoose;

const testDataSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },

    },
    { timestamps: true }
);

export default mongoose.models.TestDat || mongoose.model("TestDat", testDataSchema);