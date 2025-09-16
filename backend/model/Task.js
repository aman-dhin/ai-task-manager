const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskTitle: String,
  Taskdesc: String,
  empid: {
    type: String,
    default: () => "emp_" + Math.floor(100 + Math.random() * 900) // auto empid
  },
  empname: String,
  estimatedTime: String,
});

// Transform output: rename _id → id (keep __v)
taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret; // __v stays
  }
});

module.exports = mongoose.model("Task", taskSchema);
