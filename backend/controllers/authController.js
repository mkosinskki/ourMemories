import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

export const register = async (req, res) => {
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
            message: "Register successful",
            user: userToReturn,
            token: token
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ errors });
        }
        if (error.code === 11000) {
            return res.status(409).json({
                errors: { email: 'User with this email exists.' }
            });
        }
        res.status(500).json({ message: "Internal server error." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Enter your email and password.' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ msg: 'Incorrect login/password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect login/password.' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '2h' },
            (err, token) => {
                if (err) throw err;
                const { password, ...userToReturn } = user.toObject();
                res.status(200).json({ token: token, user: userToReturn });
            }
        );

    } 
    catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};