const jwt = require('jsonwebtoken');

function generateUserToken(UserData) {
    try {
        const token = jwt.sign(
            { userId: UserData.userName, role: 'user' },
            'usersecrettoken',
            { algorithm: 'HS256', expiresIn: '1h' }
        );
        console.log('Generated User Token:', token);
        return token;
    } catch (err) {
        console.error('Error generating token:', err);
        return null;
    }
}
function generateAdminToken() {
    try {
        const token = jwt.sign(
            { userId: 'admin001', role: 'admin' },
            'adminsecrettoken',
            { algorithm: 'HS256', expiresIn: '1h' }
        );
        console.log('Generated Admin Token:', token);
        return token;
    } catch (err) {
        console.error('Error generating token:', err);
        return null;
    }
}

function verifyToken(token, secret) {
    console.log("Verifying token:", token, "with secret:", secret);
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err);
        return null;
    }
}

function userAuthMiddleware(req, res, next) {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token, 'usersecrettoken');
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const userData = decoded;
    if (!userData && userData.userId !== req.params.userName) {
        return res.status(401).send('Unauthorized');
    }
    console.log("------------- Authenticated user:", userData);
    next();
}



module.exports = {
    generateUserToken,
    generateAdminToken,
    verifyToken,
    userAuthMiddleware
};