import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

export const register = async (req, res, next) => {
    const { email, password, firstName, surname, dateOfBirth } = req.body;

    try {
        const newUser = new User({
            email,
            password,
            firstName,
            surname,
            dateOfBirth,
        });
        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);
        const { password: _, ...userToReturn } = savedUser.toObject();

        res.status(201).json({
            message: req.t("registerSuccess"),
            user: userToReturn,
            token: token
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: req.t("enterEmailAndPassword") });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: req.t("incorrectLoginPassword") });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: req.t("incorrectLoginPassword") });
        }

        const token = generateToken(user._id);
        const { password: _, ...userToReturn } = user.toObject();
        res.status(200).json({ token: token, user: userToReturn });

    } 
    catch (err) {
        res.status(500).json({ message: req.t("internalServerError") });
    }
};