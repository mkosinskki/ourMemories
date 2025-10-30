import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: [ true, "Location is required" ]},
    eventDate: { type: Date, required: [ true, "Event date is required" ]},
    description: { type: String, required: [ true, "Description is required" ]},
    timestamp: { type: Date, default: Date.now }
})

const Memory = mongoose.models.Memory || mongoose.model("Memory", memorySchema);
export default Memory;