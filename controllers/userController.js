// to catch errors in async functions we will use a middeware called express-async-handler package
// this eliminateds the need of try catch block in each function
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


// whenever we interact with mongodb and mongoose, we receive a promise

//@desc Register a user
//@route POST /api/users/register
//@access Public 

const registerUser = asyncHandler (async (req, res) => {

    // check if all fields are filled
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // check if user already exists
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }


    // creating the User object in the database

    // hashing of password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`User created ${username}`);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({_id: user.id, email: user.email});
    }   else {  
        res.status(400);
        throw new Error("User data is not valid");
    };
    res.json({messge: "Register the user"});u
    
});

//@desc Login user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler (async (req, res) => {
    const {userName, email, password} = req.body;

    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // creating the User object in the database
    const User = await User.create({
        userName,
        email,
        password
    });
    res.status(201).json(User);
});

//@desc Current user info
//@route Post /api/usedrs/current
//@access Private -- only current user can see her data

const currentUser = asyncHandler(async (req, res) => {
    const User = await User.findById(req.params.id);

    if (!User) {
        res.status(404);
        throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedUser);
    
});


module.exports = {
  registerUser,
  loginUser,
  currentUser,
};