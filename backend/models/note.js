//Let's say we have a note taking app
//We need a note taking schema

//-----Models are a representation of our data!-----

// Schema: We createa structure of properties associated with the model
//In ordcer to make a schema we have to require Mongoose
// A schema can be thought of in terms of classes, its what the data should look like when its saved to the database (how its organized)


const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
//This is the typical naming convention. Because we're in our note file its noteSchema. If it were a 
//file called todo we might call it todoSchema, etc.
    title: String,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const Note = mongoose.model("Note", noteSchema)

module.exports = Note


//A note on models and routing (which will be built out in the controller and index):
//Everytime we build an application we need to establish CRUD routes for our Notes model:
//---------------------CREATE (app.post/notes)
//---------------------READ (app.get/notes to read all note items and app.get for specific note items)
//---------------------UPDATE (app.put/notes/:id to update a note by ID)
//---------------------DELETE (app.delete/:id to delete a note by ID)


//If we create another model for todo then we will need CRUD routes for the todo model, and so on:
//---------------------CREATE
//---------------------READ
//---------------------UPDATE
//---------------------DELETE