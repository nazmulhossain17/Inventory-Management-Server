const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
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

    const user = await User.create({ name, email, password });

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({ _id, name, email, photo, phone, bio });
    } else {
        res.status(400).json({ error: 'User registration failed' });
    }
});

module.exports = { registerUser };