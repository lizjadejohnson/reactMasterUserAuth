const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController')
const authenticate = require('../config/jwtAuth.js');


//-------------------------TODO ROUTES-------------------------
// -----Get ALL Todos (GET):
router.get("/", authenticate, todosController.fetchAllTodos)


// -----Get specific Todos by ID (GET):
router.get("/:id", authenticate, todosController.fetchTodo)

// -----Create a Todo Item (POST):
router.post("/", authenticate, todosController.createTodo)


// -----Update a specific Todo Item (PUT):
router.put("/:id", authenticate, todosController.updateTodo)


// -----Delete a specific todo item (DELETE):
router.delete("/:id", authenticate, todosController.deleteTodo)

module.exports = router;