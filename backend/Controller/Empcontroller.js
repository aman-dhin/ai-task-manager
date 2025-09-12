const Emp  =require('../model/Emp');

// create emp 
exports.createemp = async (req,res)=>{
    try {
        const {empid,empname, empskills} =req.body;   

    const emp =new Emp ({empid,empname, empskills})
    await emp.save();
    res.json(emp);
    } catch (error) {
        console.log("error while sving emp",error);
        
        res.status(400).json({"error":"Inter server error "})
    }

}

// get emp 
exports.getallemp =async (req,res)=>{
   
    try {
        const emp=await Emp.find();
        res.json(emp);
    } catch (error) {
        console.log("error while sving emp",error);
        
        res.status(400).json({"error":"Inter server error "})
        

    }
}