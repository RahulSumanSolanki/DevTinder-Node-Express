const express = require('express');
const app = express();
const { adminAuth, userAuth } = require('./middleware');


app.post("/user/login", (req, res) => {
    console.log(req.body); 
    res.send('User logged in successfully!');
});

app.use("/user/:user_id", (req, res, next) => {
    console.log("Middleware for all routes");
    userAuth(req, res, next);
    next();
});

app.get("/user/:user_id/profile/", (req, res) => {
    console.log(req.params);
    res.send(
        {
            "_id": "001",
            "first_name": "Ranveer",
            "last_name": "Singh",
            "age": 38,
            "name": "Ranveer Singh",
            "createdAt": {
                "$date": "2026-01-06T09:03:21.689Z"
            }
        }
    );
});

app.post("/user/:user_id/profile", (req, res) => {
    console.log(req.body);
    res.send('Profile created successfully!');
});

app.use("/contact-us", (req, res) => {
    res.send('This is Contact Us page!');
}, (req, res) => {
    res.send('This is Contact Us page2222!');
}
);

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});