const { connectToDatabase } = require('./config/database');
const { validateSingupData, validateLoginData } = require('./utils/validations');
const UserModel = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
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
    // Placeholder for login logic
    res.send('login successful');
});

app.post('/signup', async (req, res) => {
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
        res.send('Signup endpoint');
    } catch (err) {
        console.error('Error in /signup:', err.message);
        // console.log(err.message, err.reason);
        res.status(500).send(err.message);
    }
});

app.get('/user/:userName/profile', async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await UserModel.findOne({ userName: userName });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error('Error in /user/:userName/profile:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search', async (req, res) => {
    try {
        const searchParams = req.query;
        const users = await UserModel.find(searchParams);
        res.json(users);
    } catch (err) {
        console.error('Error in /search:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/user/:userName/findMatch', async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await UserModel.findOne({ userName: userName });
        const feed = await UserModel.find({ gender: user.genderPreference }).limit(10);
        res.json(feed);
    } catch (err) {
        console.error('Error in /search:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.patch('/user/:userName/updateProfile', async (req, res) => {
    try {
        const userName = req.params.userName;
        const updateData = req.body;
        console.log("Update Data:", updateData);
        const user = await UserModel.findOneAndUpdate({ userName: userName }, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error('Error in /user/:user_id/updateProfile:', err);
        res.status(500).send('Internal Server Error');
    }
});

connectToDatabase().then(() => {
    console.log('Connected to the database successfully.');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
