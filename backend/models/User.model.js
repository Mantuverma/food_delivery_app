import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,

    },
    role: {
        type: String,
        enum: ['user', 'admin', 'deliveryBoy'],
        default: 'user',
    },
    mobile: {
        type: String,
        trim: true,
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;