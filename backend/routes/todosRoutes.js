const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController')


//-------------------------TODO ROUTES-------------------------
// -----Get ALL Todos (GET):
router.get("/", todosController.fetchAllTodos)


// -----Get specific Todos by ID (GET):
router.get("/:id", todosController.fetchTodo)

// -----Create a Todo Item (POST):
router.post("/", todosController.createTodo)


// -----Update a specific Todo Item (PUT):
router.put("/:id", todosController.updateTodo)


// -----Delete a specific todo item (DELETE):
router.delete("/:id", todosController.deleteTodo)

module.exports = router;