const Note = require('../models/note')


//Note that the methods are referenced in our main index.js file!

// -----Get ALL Notes (GET):
const fetchAllNotes = async (req, res) => {
    try {
        console.log("Fetching all notes for user:", req.user._id);
        const userId = req.user._id;
        const notes = await Note.find({ user: userId });
        res.json({ notes: notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

///////////////////////////////////////////////////////////////////////////////////////

// -----Get specific Notes by ID (GET):
const fetchNote = async (req, res) => {

    //1. Get our ID off the URL:
    const noteID = req.params.id
    const userID = req.user._id;

    //2. Find the specific note using that ID:
    const note = await Note.findOne({ _id: noteID, user: userID });

    //3. Send response with that Note as the payload
    res.json({note: note})
}

///////////////////////////////////////////////////////////////////////////////////////

// -----Create a Note (POST):
const createNote = async (req, res) => {
    console.log(`BODY: ${req.body}`)
    //1. Get data from req.body:

    // const title = req.body.title
    // const body = req.body.body
    const {title,body} = req.body //This is the same as writing the 2 lines above!
    const userId = req.user._id; //Get the user id
    
    //2. Create the note:
    const note = await Note.create({
        title: title,
        body: body,
        user: userId
    })
    
    //3. Respond with new copy of note
    res.json({note: note})
}

///////////////////////////////////////////////////////////////////////////////////////

// -----Update a specific note
const updateNote = async (req, res) => {

    //1. Get the ID off the URL:
    const noteId = req.params.id

    //2. Get the data off the ID:
    const {title,body} = req.body

    //3. Get user id:
    const userId = req.user._id;

    //3. Find and update Note:
    const updatedNote = await Note.findOneAndUpdate({ _id: noteId, user: userId },
        {
        title: title,
        body: body},
        { new: true }
    );

    res.json({ note: updatedNote });
}

///////////////////////////////////////////////////////////////////////////////////////

// -----Delete a specific note:
const deleteNote = async (req, res) => {

    //1. Get the ID off the URL:
    const noteId = req.params.id
    const userId = req.user._id;

    //2. Delete the record:
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: userId });

    //3. Send response:
    res.json({ message: "Note deleted" });
}

///////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    fetchAllNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}