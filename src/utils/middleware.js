const { verifyToken } = require('./authToken');

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
    console.log("inside userAuth middleware");
    if (req.headers.authorization) {
        const decoded = verifyToken(req.headers.authorization, "usersecrettoken");
        console.log("Decoded Token:", decoded);
        if (decoded === null || decoded.role !== 'user' || decoded.userId !== req.params.user_id) {
            console.log("Unauthorized access attempt.");
            return res.status(401).send('Unauthorized');
        }
    }
    next();
};

module.exports = { userAuth };