const User = require('../models/user')


//Encryption / Authentication Tools:
const bcrypt = require('bcryptjs') //Requires bcrypt encryption to encrypt passwords (be sure to npm install it!)
const jwt = require('jsonwebtoken') //Be sure top also npm install this as well



//Note that the methods are referenced in our main index.js file!

// -----Get ALL Users (GET):
const fetchAllUsers = async (req, res) => {

    //1. Get all users from the DB:
    const users = await User.find();

    //2. Send the users back as a response:
    res.json({users: users})
}

// -----Get specific Users by ID (GET):
const fetchUser = async (req, res) => {

    //1. Get our ID off the URL:
    const userID = req.params.id

    //2. Find the specific user using that ID:
    const user = await User.findById(userID)

    //3. Send response with that user as the payload
    res.json({user: user})
}


// -----Create a User (POST):
const createUser = async (req, res) => {
    console.log(`BODY: ${req.body}`)
    //1. Get data from req.body:

    // const title = req.body.title
    // const body = req.body.body
    const {username, password, email} = req.body //This is the same as writing the 2 lines above!
    
    //2. Create the user:
    const user = await User.create({
        username: username,
        password: password,
        email: email,
    })
    
    //3. Respond with new copy of user
    res.json({user: user})
}


// -----Update a specific user
const updateUser = async (req, res) => {

    //1. Get the ID off the URL:
    const userId = req.params.id

    //2. Get the data off the ID:
    const {username, password, email} = req.body

        //3. Find and update the user:
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username: username,
            password: password,
            email: email,
        })

        //4. Retrieve updated user and send it as a response:
        res.json({user: updatedUser})
}

// -----Delete a specific user:
const deleteUser = async (req, res) => {

    //1. Get the ID off the URL:
    const userId = req.params.id

    //2. Delete the record:
    const deletedUser = await User.findByIdAndDelete(userId);

    //3. Send response:
    res.json({ message: "User deleted" });
}


module.exports = {
    fetchAllUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser
}