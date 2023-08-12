const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Enter Your Email"],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Enter your Password"],
        minLength: [6, "Password must be at least 6 characters"],
        maxLength: [23, "Password must not exceed 23 characters"]
    },
    photo: {
        type: String,
        required: [true, "Upload your Photo"],
        default: "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg",
    },
    phone: {
        type: String,
        default: "+880"
    },
    bio: {
        type: String,
        default: "bio",
        maxLength: [250, "Bio must not exceed 250 characters"]
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
