const { connectToDatabase } = require('./config/database');
const UserModel = require('../models/user');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
    console.log(JSON.stringify(req.body));
    const user = new UserModel(req.body);
    await user.save();
    res.send('Signup endpoint');   
    } catch (err) {
        console.error('Error in /signup:', err);
        res.status(500).send('Internal Server Error', err.message);
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
