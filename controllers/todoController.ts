import expressAsyncHandler from "express-async-handler";
import todoModel from "../models/todoModel";
import userModel from "../models/userModel";
import { todoSchema, updateTodoSchema } from "../utils/validation";

// @docs create a new todo
// @route POST /api/todos
// @access Private
export const createTodo = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    body.userId = req.body.userId.id;
    const validate = todoSchema.safeParse(body);
    if (!validate.success) {
        res.status(400);
        throw new Error(`${validate.error.issues[0].path} ${validate.error.issues[0].message}`);
        return;
    }

    const userExists = await userModel.findById(validate.data.userId);
    if (!userExists) {
        res.status(400);
        throw new Error("User not found");
        return;
    }

    const todoExists = await todoModel.findOne({ title: validate.data.title, userId: validate.data.userId });
    if (todoExists) {
        res.status(400);
        throw new Error("Todo already exists");
        return;
    }

    await todoModel.create(validate.data);
    res.status(201).json({ message: "Todo created successfully" });
});

// @docs get all todos
// @route GET /api/todos
// @access Private
export const getTodos = expressAsyncHandler(async (req, res) => {
    const userId = req.body.userId.id;
    const todos = await todoModel.find({ userId });
    res.json(todos);
});

// @docs get a todo by id
// @route GET /api/todos/:id
// @access Private
export const getTodoById = expressAsyncHandler(async (req, res) => {
    const todoId = req.params.id;

    if (!todoId || todoId.length !== 24) {
        res.status(400);
        throw new Error("Invalid todo id");
        return;
    }
    const todo = await todoModel.findById(todoId);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
        return;
    }

    res.json(todo);
});

// @docs update a todo
// @route PATCH /api/todos/:id
// @access Private
export const updateTodo = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const todoId = req.params.id;
    delete body.userId;

    const validate = updateTodoSchema.safeParse(body);
    if (!todoId || todoId.length !== 24) {
        res.status(400);
        throw new Error("Invalid todo id");
        return;
    }

    if (!validate.success) {
        res.status(400);
        throw new Error(`${validate.error.issues[0].path} ${validate.error.issues[0].message}`);
        return;
    }

    const todoExists = await todoModel.findById(todoId);
    if (!todoExists) {
        res.status(404);
        throw new Error("Todo not found");
        return;
    }

    if (validate.data.title) {
        const isDuplicate = await todoModel.findOne({ title: validate.data.title, userId: todoExists.userId });
        if (isDuplicate && isDuplicate._id.toString() !== todoId) {
            res.status(400);
            throw new Error("Todo already exists");
            return;
        }
    }

    await todoModel.findByIdAndUpdate(todoId, validate.data, { new: true, runValidators: true });

    res.json({message: "Todo updated successfully"});
});

// @docs delete a todo
// @route DELETE /api/todos/:id
// @access Private
export const deleteTodo = expressAsyncHandler(async (req, res) => {
    const todoId = req.params.id;
    if (!todoId || todoId.length !== 24) {
        res.status(400);
        throw new Error("Invalid todo id");
        return;
    };

    const todo = await todoModel.findById(todoId);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
        return;
    }
    await todoModel.findByIdAndDelete(todoId);
    res.json({ message: "Todo deleted successfully" });
});

// @docs get todos by status
// @route GET /api/todos/status/:status
// @access Private
export const filterTodos = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const status = req.params.status.toLocaleLowerCase() === 'true' ? true : false;
    body.userId = req.body.userId.id;


    const todos = await todoModel.find({ userId: body.userId, status });
    if (!todos.length) {
        res.status(404);
        throw new Error("No todos found");
        return;
    }
    res.json(todos);
});
