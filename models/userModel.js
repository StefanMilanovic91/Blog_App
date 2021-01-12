const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
});

module.exports =  User = mongoose.model('User', userSchema);