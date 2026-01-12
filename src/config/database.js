const mongoose = require('mongoose');
const { DBUser, DBPassword }    = require('../../credentials');

async function connectToDatabase() {
    await mongoose.connect(`mongodb+srv://${DBUser}:${DBPassword}@namastenode.sicbsll.mongodb.net/HelloWorld`);
}

module.exports = { connectToDatabase };