const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js')
const authenticate = require('../config/jwtAuth.js'); // adjust the path as needed



//-------------------------USER ROUTES-------------------------
// Create a user (POST)
router.post("/", usersController.createUser);

// User login (POST)
router.post("/login", usersController.loginUser);

// User logout (GET)
router.get("/logout", authenticate, usersController.logoutUser);

// Fetch all users (GET)
router.get("/", authenticate, usersController.fetchAllUsers);

// Fetch specific user by ID (GET)
router.get("/:id", authenticate, usersController.fetchUser);

// Update a specific user (PUT)
router.put("/:id", authenticate, usersController.updateUser);

// Delete a specific user (DELETE)
router.delete("/:id", authenticate, usersController.deleteUser);

// Define a protected route
router.get("/protected/data", authenticate, (req, res) => {
    res.json({ message: 'This is protected data', user: req.userId });
});

module.exports = router;