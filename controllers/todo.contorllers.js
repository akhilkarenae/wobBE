import {
  findTodoByTodoId,
  findTodosByUserId,
  saveTodo,
} from "../db/repository/todo.repository.js";
import { ValidationError } from "../errorHandlers/ValidationError.errorHandlers.js";
import { deleteTodoById, editTodoById, getAllTodosByUserId } from "../services/todo.services.js";
import { validateTitle } from "../utils/helpers.utils.js";

const createTodo = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, description } = req.body;
    // console.log(req.body)
    const validate = validateTitle({title});
    if (validate.length>0) {
      throw new ValidationError(validate);
    }
    const todo = await saveTodo(title, description, user);
    res
      .status(200)
      .send({ success: true,todo:todo, message: "Successfuly created a todo" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const todos = await getAllTodosByUserId(user.id,limit,skip,page);
    return res.status(200).send({ success: true, todos: todos });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, description, completed, todoId } = req.body;
    const validate = validateTitle({title});
    if (validate.length>0) {
      throw new ValidationError(validate);
    }
    const todo = await findTodoByTodoId(todoId, user.id);
    if (!todo) {
      return res.status(400).send({ success: true });
    }
    const updatedTodo = await editTodoById({
      title,
      description,
      completed,
      todoId,
      userId: user.id,
    });
    return res.status(200).send({ success: true, updatedTodo: updatedTodo });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const user = req.user;
    const { todoId } = req.body;
    const todo = await findTodoByTodoId(todoId, user.id);
    if (!todo) {
      return res.status(400).send({ success: true });
    }
    await deleteTodoById({ todoId, userId: user.id });
    return res
      .status(200)
      .send({ success: true, message: "Successfully delete todo" });
  } catch (err) {
    next(err);
  }
};

export { createTodo, getAllTodos, updateTodo, deleteTodo };