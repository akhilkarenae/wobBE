import mongoose from "mongoose"

const todoListModel = mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,trim:true},
    isCompleted:{type:Boolean,default:false},
    createdAt: { type: Date },
    modifiedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    modifiedBy: { type: String }
},{timestamp:true});


export const TodoListModel = mongoose.model("todoList",todoListModel);

// async function dropCollection(TodoListModel) {
//     try {
//       await TodoListModel.collection.drop();
//       console.log('Successfully dropped UserModel');
//     } catch (error) {
//       console.error('Drop failed', error);
//     }
//   }
  
//   dropCollection(TodoListModel);
