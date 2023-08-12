const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const User = require('../models/user.model');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ error: 'Please fill in all required fields' });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters' });
        return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({ _id, name, email, photo, phone, bio });
    } else {
        res.status(400).json({ error: 'User registration failed' });
    }
});

module.exports = { registerUser };
