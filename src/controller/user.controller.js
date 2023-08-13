const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { jwtKey } = require('../config/secret');
const bcrypt = require("bcryptjs");


const generateToken = (id) =>{
    return jwt.sign({id}, jwtKey, {expiresIn: "1d"})
}

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
    const token = generateToken(user._id)

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    })
    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({ _id, name, email, photo, phone, bio, token });
    } else {
        res.status(400).json({ error: 'User registration failed' });
    }
});

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password");
    }

    const user = await User.findOne({email})

    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    const token = generateToken(user._id)

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    })

    if(user && passwordIsCorrect){
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({ _id, name, email, photo, phone, bio, token });
    }else{
        res.status(400);
        throw new Error("Invalid email and password");
    }
});



const logOut = asyncHandler(async(req, res)=>{
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({message: "logout successful"})
})


const getUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({ _id, name, email, photo, phone, bio });
    }else{
        res.status(400);
        throw new Error("User Not Found")
    }
});

const loginStatus = asyncHandler(async(req, res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json(false)
    }
    const verified = jwt.verify(token, jwtKey)
    if(verified){
        return res.json(true)
    }
    return res.json(false);
});

const updateUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        const { _id, name, email, photo, phone, bio } = user;
        user.email = email,
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.name || photo;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email, 
            photo: updateUser.photo, 
            phone: updateUser.phone, 
            bio: updateUser.bio,
        })
    } else{
        res.status(404)
        throw new Error("404 not found")
    }
})


const changePassword = asyncHandler(async(req, res)=>{

})

module.exports = { registerUser, loginUser, logOut, getUser, loginStatus, updateUser, changePassword };
