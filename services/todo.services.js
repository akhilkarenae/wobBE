import { TodoListModel } from "../db/models/todo.model.js";
import { findAndDelete, findAndUpdate } from "../db/repository/todo.repository.js";


global.pagination = {
    'data':1,
    'metadata.total':{$arrayElemAt:['$meta.total',0]},
    'metadata.page':{$arrayElemAt:['$meta.page',0]}
}

const getAllTodosByUserId = async (userId,limit,skip,page) =>{
    try{
        let [todos] = await TodoListModel.aggregate([
            { $match:{createdBy:userId}},
            {
                $facet:{
                    meta:[{$count:'total'},{$addFields:{page:page}}],
                    data:[{$skip:skip},{$limit:limit}],
                },
            },
            {$project:pagination},
        ]).sort({_id:'asc'})

        return todos
    }catch(err){
        console.log(err);
    }
}

const editTodoById = async({title,description,completed,todoId,userId}) =>{
    try{
        const data = {};
        data.title=title
        data.description=description
        data.isCompleted=completed
        const update = await findAndUpdate(todoId,userId,data);
        return  update;
    }catch(err){
        console.log(err);
    }
}

const deleteTodoById = async ({todoId,userId}) =>{
    try{
        const remove = await findAndDelete(todoId,userId)
        return remove;
    }catch(err){
        console.log(err);
    }
}
export {  getAllTodosByUserId,editTodoById, deleteTodoById }