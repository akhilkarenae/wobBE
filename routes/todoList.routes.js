import express from "express";
import passport from "passport";

import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.contorllers.js";


passport.initialize();
const todoListRouter = express.Router();


todoListRouter.post("/create",passport.authenticate("jwt",{session:false}),createTodo)
todoListRouter.get("/",passport.authenticate("jwt",{session:false}),getAllTodos)
todoListRouter.put("/update",passport.authenticate("jwt",{session:false}),updateTodo)
todoListRouter.delete("/delete",passport.authenticate("jwt",{session:false}),deleteTodo)


export default todoListRouter