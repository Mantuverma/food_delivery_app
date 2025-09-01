import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { getToken } from '../utils/token.js';


export const signup = async (req, res) => {

    try {
        const { userName, email, password, role, mobile } = req.body;
        // Validate input
        if (!userName || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role: role || 'user',
            mobile
        });
        await newUser.save();
        const token = await getToken(newUser._id);
        res.cookie('token', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' || false,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }
        );
        res.status(201).json({ userName, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = await getToken(user._id);
        res.cookie('token', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' || false,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            }
        );
        res.status(200).json({ user, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' || false,
            sameSite: 'Strict',
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}