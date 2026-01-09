function adminAuth(req, res, next) {
    console.log("req baseUrl : ", req.baseUrl);
    console.log("req headers : ", req.headers);
    console.log("req hostname : ", req.hostname);
    if (req.headers.authorization !== "Bearer adminsecrettoken") {
        console.log("Unauthorized access attempt.");
        return res.status(401).send('Unauthorized');
    }
    next();
};

function userAuth(req, res, next) {
    console.log("req baseUrl : ", req.baseUrl);
    console.log("req headers : ", req.headers);
    console.log("req hostname : ", req.hostname);
    if (req.headers.authorization !== "Bearer usersecrettoken") {
        console.log("Unauthorized access attempt.");
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = { adminAuth, userAuth };