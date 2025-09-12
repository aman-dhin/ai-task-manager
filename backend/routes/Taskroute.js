const express =require('express');
const { createemp ,getallemp, suggestTask, getALlTask,createTask } = require('../Controller/Taskcontroller');
const router =express.Router();

router.post("/suggest",suggestTask);  
router.post("/create",createTask);  
router.get("/getTaskList" ,getALlTask);



module.exports=router;


 