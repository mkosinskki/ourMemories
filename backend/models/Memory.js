import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    eventDate: { type: Date, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const Memory = mongoose.models.Memory || mongoose.model("Memory", memorySchema);
export default Memory;