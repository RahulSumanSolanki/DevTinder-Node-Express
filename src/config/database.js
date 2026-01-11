const mongoose = require('mongoose');

async function connectToDatabase() {
    await mongoose.connect('mongodb+srv://rahulsumansolanki_db_user:ENKEhsgb2J2fJizq@namastenode.sicbsll.mongodb.net/HelloWorld');
}

module.exports = { connectToDatabase };