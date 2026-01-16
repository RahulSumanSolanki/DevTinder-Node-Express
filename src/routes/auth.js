
const { validateSingupData, validateLoginData } = require('../utils/validations');
const UserModel = require('../models/user');
const { generateUserToken } = require('../utils/authToken');
const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

console.log('Auth router initialized.');

authRouter.post('/auth/login', async (req, res) => {
    console.log('Login request received:', req.body);
    const errors = validateLoginData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    const { email, passWord } = req.body;
    console.log(`Login attempt for email: ${email}`, passWord);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid email or password');
    }
    const token = generateUserToken(user);
    res.cookie('authToken', token);
    // Placeholder for login logic
    res.send('login successful');
});

authRouter.post('/auth/signup', async (req, res) => {
    try {
        const errors = validateSingupData(req.body);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        console.log(JSON.stringify(req.body));
        const passwordHash = await bcrypt.hash(req.body.passWord, 10);
        const user = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            passWord: passwordHash,
            age: req.body.age,
            gender: req.body.gender,
            genderPreference: req.body.genderPreference
        });
        await user.save();
    const token = generateUserToken(user);
    res.cookie('authToken', token);
        res.send('Signup endpoint');
    } catch (err) {
        console.error('Error in /signup:', err.message);
        // console.log(err.message, err.reason);
        res.status(500).send(err.message);
    }
});

module.exports = authRouter;
