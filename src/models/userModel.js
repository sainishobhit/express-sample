const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required',
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: 'Password is required',
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)