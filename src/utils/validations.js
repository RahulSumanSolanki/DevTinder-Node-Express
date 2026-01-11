const validator = require('validator');

function validateSingupData(data) {
    let errors = {};
    if (!data.userName) {
        errors.userName = "Username is required";
    }
    if (!data.email) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }
    if (!data.passWord) {
        errors.password = "Password is required";
    } else if (data.passWord.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    } else if (!validator.isStrongPassword(data.passWord)) {
        errors.password = "Password must be a strong password";
    }
    return errors;
}

function validateLoginData(data) {
    let errors = {};
    if (!data.email) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email format";
    }
    if (!data.passWord) {
        errors.password = "Password is required";
    }
    return errors;
}
module.exports = {
    validateSingupData,
    validateLoginData
};