const mongoose =require('mongoose');
const Empscheme = new mongoose.Schema({
    empid:String,
    empname:String,
    empSkills:String,

})

module.exports=mongoose.model("Emp",Empscheme);
