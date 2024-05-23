const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js')
const authenticate = require('../config/jwtAuth.js'); // adjust the path as needed

//Note that some routes have been commented out - these were for template purposes.
//Feel free to comment/uncomment/edit as needed for your application

//-------------------------USER ROUTES-------------------------

// Update a specific user (PUT)
// router.put("/:id", authenticate, usersController.updateUser);

// Fetch all users (GET)
// router.get("/", authenticate, usersController.fetchAllUsers);

// Fetch a specific user by ID (GET)
// router.get("/:id", authenticate, usersController.fetchUser);


// Create a user (POST)
router.post("/", usersController.createUser);

// User login (POST)
router.post("/login", usersController.loginUser);

// User logout (GET)
router.get("/logout", authenticate, usersController.logoutUser);


// Fetch current user (GET)
router.get("/me", authenticate, usersController.fetchMe);


// Update the current user (PUT)
router.put("/me", authenticate, usersController.updateUser);


// Delete a user (DELETE)
router.delete("/:id", authenticate, usersController.deleteUser);

// Define a protected route
router.get("/protected/data", authenticate, (req, res) => {
    res.json({ message: 'This is protected data', user: req.userId });
});

module.exports = router;