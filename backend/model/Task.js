const mongoose =require('mongoose');

const Taskschema =new mongoose.Schema({
   taskTitle:String,
   Taskdesc:String,
   empname:String,
   estimatedTime:String,


})

module.exports=mongoose.model("Task",Taskschema);