const Task =require('../model/Task');
  
const { getTasksuggestion, getTaskprediction } = require("../services/Aiservices");

exports.suggestTask = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ suggestions: [], error: "Input is required" });

    const suggestionText = await getTasksuggestion(input);

    if (!suggestionText) {
      return res.status(503).json({ suggestions: [], error: "AI service unavailable. Try again later." });
    }

    const suggestions = suggestionText
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    res.json({ suggestions });
  } catch (error) {
    console.error("❌ Error in suggestTask:", error);
    res.status(503).json({ suggestions: [], error: "AI service is currently unavailable. Please try again later." });
  }
};
exports.createTask= async (req,res) =>{
    const{taskTitle,Taskdesc,empname,}=req.body;
      const estimatedTime =await getTaskprediction(Taskdesc);
      const task  =new Task({taskTitle,Taskdesc,empname,estimatedTime,});
      await task.save();
      res.json(task);


}

exports.getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    // Map _id to id
    const tasksWithId = tasks.map(task => ({
      ...task._doc,   // all fields
      id: task._id    // map _id to id
    }));
    res.json(tasksWithId);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateTask=async (req,res)=>{
 try {
   const {id} =req.params;
   const {  taskTitle,Taskdesc,empname} =req.body;
   const updatedTask =await Task.findByIdAndUpdate(
    id,
    {taskTitle,Taskdesc,empname},
    {new :true ,runValidators:true}
   );
   if(!updatedTask){
    return res.status(404).json({message:"Task not found"});
   }
  
   res.json(updatedTask);
 } catch (error) {
     console.error("error updating task",error);
     res.status(500).json({error:"internal server error"});
     
 }

};