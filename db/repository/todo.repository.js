import { TodoListModel } from "../models/todo.model.js";



const saveTodo = async (title,description,user) =>{
    try{
        const newTodo = new TodoListModel({title:title,description:description ?? "",createdBy:user.id})
        const _todo = await newTodo.save();
        return _todo;
    }catch(err){
        console.log(err);
    }
}


const findTodoByTodoId = async (todoId,userId) =>{
    try{
        const todo = await TodoListModel.findOne({_id:todoId,createdBy:userId})
        return  todo;
    }catch(err){
        console.log(err);
    }
}

const findTodosByUserId = async (userId) =>{
    try{
        const todos = await TodoListModel.find({createdBy:userId})
        return todos;
    }catch(err){
        console.log(err);
    }
}

const findAndUpdate = async (todoId,userId,data) =>{
    try{
        const update = await TodoListModel.findOneAndUpdate({_id:todoId,createdBy:userId},{...data},{new:true})
        return update;
    }catch(err){
        console.log(err);
    }
}

const findAndDelete =  async (todoId,userId) =>{
    try{
        const remove = await TodoListModel.findOneAndDelete({_id:todoId,createdBy:userId})
        return remove;
    }catch(err){
        console.log(err);
    }
}

export { saveTodo, findTodoByTodoId, findTodosByUserId, findAndUpdate, findAndDelete }