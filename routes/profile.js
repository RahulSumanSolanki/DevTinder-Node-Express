
const UserModel = require('../models/user');
const { userAuthMiddleware } = require('../src/utils/authToken');
const express = require('express');
const cokieParser = require('cookie-parser');
const profileRouter = express.Router();

console.log('Profile router initialized.');

profileRouter.get('/profile/:userName/view', userAuthMiddleware, async (req, res) => {
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

profileRouter.patch('/profile/:userName/update', userAuthMiddleware, async (req, res) => {
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

module.exports = profileRouter;
