import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: [ true, "emailRequired"], unique: true, lowercase: true, trim: true, match: [ /^\S+@\S+\.\S+$/, "emailInvalid" ], },
    password: { type: String, required: [ true, "passwordRequired"], minlength: [8, "passwordMinLength"], select: false },
    firstName: { type: String, required: [ true, "firstNameRequired"], match: [ /^[\p{L}]+$/u, "nameOnlyLetters" ], minlength: [3, "nameMinLength"], trim: true, },
    surname: { type: String, required: [ true, "surnameRequired"], match: [ /^[\p{L}]+$/u, "surnameOnlyLetters" ], minlength: [3, "surnameMinLength"], trim: true, },
    dateOfBirth: { type: Date, required: [ true, "dobRequired"], max: [Date.now, "dobNoFuture"] },
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