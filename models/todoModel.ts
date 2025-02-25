import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},
    { timestamps: true }
);

const todoModel = mongoose.models.todo || mongoose.model("todo", Schema);

export default todoModel;
