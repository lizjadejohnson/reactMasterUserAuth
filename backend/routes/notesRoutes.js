const express = require('express');
const router = express.Router();
const notesController = require("../controllers/notesController.js");
const authenticate = require('../config/jwtAuth.js');


//-------------------------NOTES ROUTES-------------------------

// -----Get ALL Notes (GET):-----
router.get("/", authenticate, notesController.fetchAllNotes)


// -----Get specific Notes by ID (GET):-----
router.get("/:id", authenticate, notesController.fetchNote)

// -----Create a Note (POST):-----
router.post("/", authenticate, notesController.createNote)


// -----Update a specific note (PUT):-----
router.put("/:id", authenticate, notesController.updateNote)


// -----Delete a specific note (DELETE):-----
router.delete("/:id", authenticate, notesController.deleteNote)

// Define a protected route
router.get("/protected/data", authenticate, (req, res) => {
    res.json({ message: 'This is protected data', user: req.userId });
});

module.exports = router;