const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Userschema = new Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    profileurl: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required:false
    },
    bio: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    id: {
        type: String,
        default: Date.now().toString()
    },
    joinDate: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },
})

const Usermodel = mongoose.model('newuser', Userschema)
module.exports = Usermodel