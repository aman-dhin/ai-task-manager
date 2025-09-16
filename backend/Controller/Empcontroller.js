const Emp  =require('../model/Emp');

// create emp 
exports.createemp = async (req,res)=>{
    try {
        const {empid,empname, empSkills} =req.body;   

    const emp =new Emp ({empid,empname, empSkills})
    await emp.save();
    res.json(emp);
    console.log("incoming body",req.body);
    
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
    // delete employee

  exports.deletemp =async (req,res)=>{
    try {
         const {id} =req.params;
         const deleteemp = await Emp.findByIdAndDelete(id);
         if (!deleteemp) {
               return res.status(400).json( {error:"employee not found"});
               
         }
         res.json({message: "employee  deleted  successfully",deleteemp });

    } catch (error) {
        console.log("error  while deleting emp",error);
        res.status(500).json({error:"internal server error"});
        
    }
  };
}