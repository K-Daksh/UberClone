const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

module.exports = connectToDb;