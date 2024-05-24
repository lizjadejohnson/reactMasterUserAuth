const Todo = require('../models/todo')


//Note that the methods are referenced in our main index.js file!

// -----Get ALL Todo items (GET):
const fetchAllTodos = async (req, res) => {

    //1. Get all notes from the DB:
    const todos = await Todo.find();

    //2. Send the notes back as a response:
    res.json({todos: todos})
}

// -----Get specific Todo items by ID (GET):
const fetchTodo = async (req, res) => {

    //1. Get our ID off the URL:
    const todoID = req.params.id

    //2. Find the specific todo using that ID:
    const todo = await Todo.findById(todoID)

    //3. Send response with that todo item as the payload
    res.json({todo: todo})
}


// -----Create a Todo Item (POST):
const createTodo = async (req, res) => {
    console.log(`BODY: ${req.body}`)
    //1. Get data from req.body:

    // const title = req.body.title
    // const body = req.body.body
    const {title, due, completionStatus} = req.body //This is the same as writing the 2 lines above!
    
    //2. Create the todo item:
    const todo = await Todo.create({
        title: title,
        due: due,
        completionStatus: completionStatus
    })
    
    //3. Respond with new copy of todo item
    res.json({todo: todo})
}


// -----Update a specific todo item
const updateTodo = async (req, res) => {

    //1. Get the ID off the URL:
    const todoId = req.params.id

    //2. Get the data off the ID:
    const {title, due, completionStatus} = req.body

        //3. Find and update todo item:
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
            title: title,
            due: due,
            completionStatus: completionStatus
        })

        //4. Retrieve updated note and send it as a response:
        res.json({todo: updatedTodo})
}

// -----Delete a specific todo item:
const deleteTodo = async (req, res) => {

    //1. Get the ID off the URL:
    const todoId = req.params.id

    //2. Delete the record:
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    //3. Send response:
    res.json({ message: "Todo item deleted" });
}


module.exports = {
    fetchAllTodos,
    fetchTodo,
    createTodo,
    updateTodo,
    deleteTodo
}