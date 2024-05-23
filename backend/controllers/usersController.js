const User = require('../models/user')

//Encryption / Authentication Tools:
const bcrypt = require('bcryptjs') //Requires bcrypt encryption to encrypt passwords (be sure to npm install it!)
const jwt = require('jsonwebtoken') //Be sure top also npm install this as well


//Note that some routes have been commented out - these were for template purposes.
//Feel free to comment/uncomment/edit as needed for your application

////////////////////////////////////////////////////////////////////////////////////////

// ----------Get ALL Users (GET)----------:

// const fetchAllUsers = async (req, res) => {
//     try {
//         //1. Get all users from the DB:
//         const users = await User.find();

//         //2. Send the users back as a response:
//         res.json({users})

//     } catch (error) {
//         console.error('Error fetching all users:', error);
//         res.status(500).json({ message: 'An error occurred while fetching users', error: error.message });
//     }
// };

////////////////////////////////////////////////////////////////////////////////////////

// -----Get specific Users by ID (GET)----------:
// const fetchUser = async (req, res) => {

//     const userId = req.params.id || req.userId;
//     try {
//         const user = await User.findById(userId).select('-password'); // Exclude the password
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ user });
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
//     }
// };

////////////////////////////////////////////////////////////////////////////////////////

// -----Get currently logged in user (GET)----------:
const fetchMe = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: req.user });
};
////////////////////////////////////////////////////////////////////////////////////////

// ----------Create a User (POST):----------
const createUser = async (req, res) => {

    //1. Get data from req.body:
        // const title = req.body.title
        // const body = req.body.body

    const {username, password, email} = req.body //This is the same as writing the 2 lines above!
    console.log("Received request body:", req.body);

    // Check if all required fields are actually *present*:
    if (!username || !password || !email) {
        console.error('Missing required fields:', { username, password, email });
        return res.status(400).json({ message: 'Username, password, and email are all required' });
    }

    // Ensure the fields are of the correct type:
    if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
        console.error('Invalid field types:', { username, password, email });
        return res.status(400).json({ message: 'Username, password, and email must be strings' });
    }

    //Username must be 3-20 characters long
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ message: 'Username must be 3-20 characters long' });
    }

    //Check for password quality:
    if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one number and one uppercase letter' });
    }


    try {
        //Check for an existing user:
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log("Username or email already exists.");
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        
        // Create the new user:
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password, // Raw password here, will be hashed in pre-save hook
        });

        await user.save();

        // Generate JWT token after user creation:
        //(When a user signs up, after saving the new user, generate a JWT and send it back to the client inside an HTTPOnly cookie.)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log("Successfully generated JWT token");

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        
        // Respond with new copy of user (excluding the password):
        res.status(201).json({ user: { _id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'An error occurred during signup', error: error.message });
    }
};

////////////////////////////////////////////////////////////////////////////////////////

// ----------Update a specific user (PUT)----------
const updateUser = async (req, res) => {

    const userId = req.user._id;  // Get id off the authenticated token
    const { username, password, email } = req.body;

    // Validate input types upfront:
    if (email && typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (username && typeof username !== 'string') {
        return res.status(400).json({ message: 'Invalid username format' });
    }
    if (password && typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid password format' });
    }

    // Build the update object:
    const updateData = {};

    if (username) {
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ message: 'Username must be 3-20 characters long' });
        }
        updateData.username = username;
    }


    if (email) updateData.email = email.toLowerCase();

    // Handle password change with extra care:
    if (password) {
        if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one number and one uppercase letter' });
        }
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
    }

    try {
        // Ensure new: true to return the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: updatedUser });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'An error occurred during user update', error: error.message });
    }
};


////////////////////////////////////////////////////////////////////////////////////////

// ----------Delete a specific user (DELETE):----------
const deleteUser = async (req, res) => {

    //1. Get the ID off the URL:
    const userId = req.params.id

    //2. Delete the record:
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    //3. Send response:
    res.json({ message: "User deleted" });
};

////////////////////////////////////////////////////////////////////////////////////////

// ----------User Login (POST):----------
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    // Check if all required fields are present:
    if (!email || !password) {
        console.error('Missing required fields:', { email, password });
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Ensure the fields are of the correct type:
    if (typeof email !== 'string' || typeof password !== 'string') {
        console.error('Invalid field types:', { email, password });
        return res.status(400).json({ message: 'Email and password must be strings' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        //bcrypt comparison:
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("Invalid password for email:", email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log("Generated JWT token");

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ message: 'Login successful', user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

////////////////////////////////////////////////////////////////////////////////////////

// ----------User Logout:----------
const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' })
};


module.exports = {
    // fetchAllUsers,
    // fetchUser,
    fetchMe,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
}