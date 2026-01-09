const jwt = require('jsonwebtoken');

function generateUserToken() {
    try {
        const token = jwt.sign(
            { userId: '001', role: 'user' },
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

module.exports = {
    generateUserToken,
    generateAdminToken,
    verifyToken
};