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
const TestData = mongoose.models.TestData || mongoose.model("TestData", testDataSchema)
export default TestData;

