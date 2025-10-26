import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

locationSchema.index({ location: '2dsphere' });
const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;