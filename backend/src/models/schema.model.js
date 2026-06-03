const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        name : {
            type: String,
            required: true
        }
    }
)

const schema = mongoose.model("users_data", user);
module.exports = schema;