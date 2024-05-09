const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB");
    } catch (err) {
        console.log("Error Mongoose-", err);
    }
}

module.exports = connectDB;