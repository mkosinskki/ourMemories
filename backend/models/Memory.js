import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: [ true, "Location is required" ]},
    eventDate: { type: Date, required: [ true, "Event date is required" ]},
    description: { type: String, required: [ true, "Description is required" ]},
    timestamp: { type: Date, default: Date.now },
    photos: { type: [String], required: [true, "At least one photo is required"], validate: {
        validator: function(v) { 
            return v.length > 0
        }, 
        message: "At least one photo is required" 
    } },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Owner of memory is required" ]}
})

const Memory = mongoose.models.Memory || mongoose.model("Memory", memorySchema);
export default Memory;