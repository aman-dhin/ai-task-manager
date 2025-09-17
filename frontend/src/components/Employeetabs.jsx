import axios from "axios";
import React, { useState } from "react";

export const TaskBoard = ({ taskList, refreshTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editEmp, setEditEmp] = useState("");

  // Delete task
  const handleDelete = async (id) => {
    if (!id) return console.error("Task ID is undefined!", id);
    try {
      await axios.delete(`https://ai-task-manager-backend-zpcf.onrender.com/api/task/delete/${id}`);
      refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  // Open edit modal
  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.taskTitle);
    setEditDesc(task.Taskdesc);
    setEditEmp(task.empname);
  };

  // Save updated task
  const handleUpdate = async () => {
    if (!editingTask) return;

    const taskId = editingTask.id || editingTask._id; // fallback safety
    if (!taskId) {
      console.error("No valid task ID found for update", editingTask);
      return;
    }

    try {
      await axios.put(`https://ai-task-manager-backend-zpcf.onrender.com/api/task/update/${taskId}`, {
        taskTitle: editTitle,
        Taskdesc: editDesc,
        empname: editEmp,
      });
      setEditingTask(null); // close modal
      refreshTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  if (!taskList || taskList.length === 0) {
    return <p className="text-center mt-5">No tasks found</p>;
  }

  return (
    <div className="bg-white mt-5 p-5 rounded shadow">
      <h3 className="text-3xl font-bold mb-4">Task Board</h3>
      <ul>
        {taskList.map((task) => {
          const taskId = task.id || task._id; // ensure correct ID
          return (
            <li
              key={taskId}
              className="bg-gray-100 mb-3 p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p><strong>Employee:</strong> {task.empname}</p>
                <p><strong>Title:</strong> {task.taskTitle}</p>
                <p><strong>Description:</strong> {task.Taskdesc}</p>
                <p><strong>Estimated Time:</strong> {task.estimatedTime}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(taskId)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border p-2 mb-3"
              placeholder="Task Title"
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full border p-2 mb-3"
              placeholder="Task Description"
            />
            <input
              type="text"
              value={editEmp}
              onChange={(e) => setEditEmp(e.target.value)}
              className="w-full border p-2 mb-3"
              placeholder="Employee Name"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-400 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
