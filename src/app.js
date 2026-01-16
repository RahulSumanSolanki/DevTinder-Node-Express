const { connectToDatabase } = require('./config/database');
const express = require('express');
const cokieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cokieParser());

console.log('App initialized with middleware.');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const feedRouter = require('./routes/feed');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', feedRouter);

connectToDatabase().then(() => {
    console.log('Connected to the database successfully.');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
