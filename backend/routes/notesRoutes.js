const express = require('express');
const router = express.Router();
const notesController = require("../controllers/notesController.js");


//-------------------------NOTES ROUTES-------------------------

// -----Get ALL Notes (GET):-----
router.get("/", notesController.fetchAllNotes)


// -----Get specific Notes by ID (GET):-----
router.get("/:id", notesController.fetchNote)

// -----Create a Note (POST):-----
router.post("/", notesController.createNote)


// -----Update a specific note (PUT):-----
router.put("/:id", notesController.updateNote)


// -----Delete a specific note (DELETE):-----
router.delete("/:id", notesController.deleteNote)

module.exports = router;