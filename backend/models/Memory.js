import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: [ true, "locationRequired" ]},
    eventDate: { type: Date, required: [ true, "eventDateRequired" ]},
    description: { type: String, required: [ true, "descriptionRequired" ]},
    timestamp: { type: Date, default: Date.now },
    photos: { type: [String], required: [true, "photoRequired"], validate: {
        validator: function(v) { 
            return v.length > 0
        }, 
        message: "photoRequired" 
    } },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "memoryOwnerRequired" ]}
})

const Memory = mongoose.models.Memory || mongoose.model("Memory", memorySchema);
export default Memory;