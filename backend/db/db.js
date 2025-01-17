const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CONTEXT_URL}`

function connectToDb() {
    mongoose.connect(URI)
        .then(() => {
            console.log('Connected to uberdb database');
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

module.exports = connectToDb;