const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, immutable: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, immutable: true },
    email: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    genderPreference: { type: String, enum: ['male', 'female', 'other'] },
},
    { timestamps: true }
);

// // Prevent updates to truly immutable fields when using update queries
// function preventImmutableInUpdate(next) {
//     const forbidden = ['firstName', 'userName'];
//     const update = this.getUpdate() || {};
//     const attempted = [];

//     const checkObj = (obj) => {
//         if (!obj) return;
//         forbidden.forEach(f => {
//             if (Object.prototype.hasOwnProperty.call(obj, f)) attempted.push(f);
//         });
//     };

//     // check both top-level and $set updates
//     checkObj(update);
//     checkObj(update.$set);

//     if (attempted.length) {
//         return next(new Error('Cannot update immutable fields: ' + attempted.join(', ')));
//     }

//     next();
// }

// userSchema.pre('findOneAndUpdate', preventImmutableInUpdate);
// userSchema.pre('updateOne', preventImmutableInUpdate);
// userSchema.pre('updateMany', preventImmutableInUpdate);

module.exports = mongoose.model('User', userSchema);