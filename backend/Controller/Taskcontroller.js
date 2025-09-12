const Task =require('../model/Task');
  
const { getTasksuggestion, getTaskprediction } = require("../services/Aiservices");

exports.suggestTask = async (req, res) => {
  try {
    const { input } = req.body;
    const suggestionText = await getTasksuggestion(input);

    // always return array
    const suggestions = suggestionText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    res.json({ suggestions });
  } catch (error) {
    console.error("❌ Error in suggestTask:", error);
    res.status(500).json({ suggestions: [], error: "Failed to fetch suggestions" });
  }
};
exports.createTask= async (req,res) =>{
    const{taskTitle,Taskdesc,empname}=req.body;
      const estimatetime =await getTaskprediction(Taskdesc);
      const task  =new Task({taskTitle,Taskdesc,empname,estimatedtime});
      await task.save();
      res.json(task);


}

exports.getALlTask= async (req,res)=>{
    try {
         const tasks =await Task.find();
         res.json(tasks);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
        
    }
}