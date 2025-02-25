import express from "express";
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo, filterTodos } from "../controllers/todoController";
import { protect } from "../middlewares/authMiddleware";

const todoRoute = express.Router();

todoRoute.route('/')
    .get(protect, getTodos)         // get all todos
    .post(protect, createTodo)      // create a todo

todoRoute.route('/:id')
    .get(protect, getTodoById)      // get a todo by id
    .patch(protect, updateTodo)     // update a todo
    .delete(protect, deleteTodo);   // delete a todo

// filter todos by status
todoRoute.get('/status/:status', protect, filterTodos);

export default todoRoute;
