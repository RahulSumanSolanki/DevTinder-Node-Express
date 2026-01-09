const mongoose  = require('mongoose');

async function connectToDatabase() {
    await mongoose.connect('mongodb+srv://@namastenode.sicbsll.mongodb.net/HelloWorld');
}

module.exports = { connectToDatabase };