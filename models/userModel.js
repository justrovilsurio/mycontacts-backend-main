const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: {
        type: String, 
        required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],     
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
