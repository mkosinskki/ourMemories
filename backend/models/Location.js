import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coordinates: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true, },
})

const Location = mongoose.models.User || mongoose.model("Location", locationSchema);
export default Location;