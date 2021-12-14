const express = require('express');
const mongoose = require('mongoose');
const res = require('express/lib/response');
require('dotenv/config');
const bodyParser = require('body-parser');
const app = express();
const todoModel = require('./models/todo_model.js');
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send('this is our second api we are building');
});
app.post('/ todo', async(req, res)=>{
    const todo = todoModel.create({
        title:req.body.title,
        body:req.body.body,
        status:req.body.status,
        endDate:req.body.endDate
    });
    try{
        const saveTodo = await todo.save();
            res.json({
            data: saveTodo,
            message:"todo successfully created"
        });
    }catch(err){
        res.json({
            mressage:err
        });
    }
});
app.get('/todo',async(req, res)=>{
    try{
       const getAllTodos= await todoModel.find();
       res.json({
        data:getAllTodos,
        message:"operation sucessful" });
    }catch(err){
        res.json({
            message:err
        });
       
    }
});
app.get('/todo/:todoid',async(req, res)=>{
    try{
       const getAllTodos= await todoModel.findById({_id:req.body.todoid});
       res.json({
        data:getAllTodos,
        message:"operation sucessful" });
    }catch(err){
        res.json({
            message:err
        });
       
    }
});
app.delete('/todos/todoId', async(req, res)=>{
    try{
    const deleteTodo = await todoModel.findOneAndDelete({_id:req.params.todoId});
    res.json({
        data:deleteTodo,
        message:"Todo successfully delete"
    });
    }catch(err){
        res.json({
            message:err
        });
    }    
});

app.patch('/todo/:todoId', async(req, res)=>{
    try{
    const updateTodo = await todoModel.findOneAndUpdate({_id:req.params.todoId,},{$set:{
        title: req.body,title,
        status: req.body.status,
        body: req.body.body
    }});
    res.json({
        data: updateTodo,
        message:"Todo successfully updated"
    });
}catch(err){
    res.json({
        message:err
    });

}
});


mongoose.connect(process.env.DB_URL, 
()=>console.log('successfully connected'));

app.listen(1020 || process.env.port);