const express =require('express');
const { createemp ,getallemp,deletemp } = require('../Controller/Empcontroller');
const router =express.Router();

router.get("/emplist",getallemp);    
router.post("/create",createemp);

module.exports=router;


