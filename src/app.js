const express = require('express');
const app = express();
const { userAuth } = require('./utils/middleware');
const {generateUserToken} = require("./utils/authToken");


app.post("/user/login", (req, res) => {
    console.log(req.headers.authorization);
     const userToken = generateUserToken();
     console.log("User Token: ", userToken);
     const userResponse = {
        "message": "Your logged in successfully!",
        "data" : {
            "userToken": userToken
        }
    }
     res.send(userResponse);
});

app.use("/user/:user_id", (req, res, next) => {
    try {
        console.log("Middleware for all routes");
        userAuth(req, res, next);
        next();
    } catch (error) {
        console.error("Error in middleware:", error.message);
        if (error.message === 'Unauthorized') {
            return res.status(401).send('Unauthorized');
        }else { 
        return res.status(500).send('Internal Server Error');
        }
    }
});

app.get("/user/:user_id/profile/", (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).send('Internal Server Error');
    }
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