const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js')


//-------------------------USER ROUTES-------------------------
// -----Get ALL users (GET):
router.get("/", usersController.fetchAllUsers)


// -----Get specific users by ID (GET):
router.get("/:id", usersController.fetchUser)

// -----Create a user (POST):
router.post("/", usersController.createUser)


// -----Update a specific user (PUT):
router.put("/:id", usersController.updateUser)


// -----Delete a specific user (DELETE):
router.delete("/:id", usersController.deleteUser)


module.exports = router;