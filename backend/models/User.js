import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: [ true, "Email adress is required"], unique: true, lowercase: true, trim: true, match: [ /^\S+@\S+\.\S+$/, 'Enter valid email.: example@mail.com' ], },
    password: { type: String, required: [ true, "Password is required"], minlength: [8, "Password must be at least 8 characters."], select: false },
    firstName: { type: String, required: [ true, "First name is required"], match: [ /^[\p{L}]+$/u, "Name can contain only letters." ], minlength: [3, "Name should be at least 3 characters"], trim: true, },
    surname: { type: String, required: [ true, "Surname name is required"], match: [ /^[\p{L}]+$/u, "Surname can contain only letters." ], minlength: [3, "Surname should be at least 3 characters"], trim: true, },
    dateOfBirth: { type: Date, required: [ true, "Date of birth name is required"] },
    role: { type: Number, default: 0 },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } 
    catch (error) {
        next(error);
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;