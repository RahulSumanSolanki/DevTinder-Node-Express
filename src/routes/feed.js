
const UserModel = require('../models/user');
const { userAuthMiddleware } = require('../utils/authToken');
const express = require('express');
const feedRouter = express.Router();

console.log('Feed router initialized.');

feedRouter.get('/feed/search', userAuthMiddleware, async (req, res) => {
    try {
        const searchParams = req.query;
        const users = await UserModel.find(searchParams);
        res.json(users);
    } catch (err) {
        console.error('Error in /search:', err);
        res.status(500).send('Internal Server Error');
    }
});

feedRouter.get('/feed/:userName/findMatch', userAuthMiddleware, async (req, res) => {
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

module.exports = feedRouter;