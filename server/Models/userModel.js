import mongoose from 'mongoose';

import chatSchema from './chatModel.js';

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: {
        type: [chatSchema],
        default: []
    }
});

const User=mongoose.model('User',userSchema);

export default User;