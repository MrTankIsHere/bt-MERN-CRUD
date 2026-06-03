const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Database connected............./ GOOD");
    } catch (err) {
        console.log("Database not connected, shitty program............./");
        console.error(err);
    }
}

module.exports = connectDB;