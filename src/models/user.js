const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, immutable: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, immutable: true },
    email: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    genderPreference: { type: String, enum: ['male', 'female', 'other'] },
},
    { timestamps: true }
);



module.exports = mongoose.model('User', userSchema);