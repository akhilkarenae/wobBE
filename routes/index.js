import express from 'express'
import userRouter from './user.routes.js';
import todoListRouter from './todoList.routes.js';


const app = express.Router();


app.use('/user',userRouter);
app.use('/todo',todoListRouter)

export default app