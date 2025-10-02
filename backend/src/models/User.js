import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
        enum: ['google', 'facebook'],
    },
    providerId: {
        type: String,
        required: true,
        index: true,
    }
}, {timestamps: true})

userSchema.index({ provider: 1, providerId: 1 }, {unique: true})

const User = mongoose.model('User', userSchema)

export default User