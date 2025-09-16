import axios from "axios";
import React, { useState } from "react";

const Taskmanagement = ({ employee, fetchTasks }) => {
  const [taskTitle, settaskTitle] = useState("");
  const [Taskdesc, setTaskdesc] = useState("");
  const [assignedemp, setassignedemp] = useState("");
  const [suggestions, setsuggestions] = useState([]);

  // Fetch AI suggestions for task title
  const handleTaskSuggestion = async (e) => {
    const value = e.target.value;
    settaskTitle(value);

    try {
      const response = await axios.post(
        "http://localhost:5500/api/task/suggest",
        { input: value }
      );
      setsuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error.response?.data?.error || error.message);
      setsuggestions([]); // fallback: no suggestions
    }
  };

  // Assign task
  const Handleassigntask = async () => {
    if (!taskTitle || !Taskdesc || !assignedemp) return alert("Fill all fields!");
    try {
      await axios.post("http://localhost:5500/api/task/create", {
        taskTitle,
        Taskdesc,
        empname: assignedemp,
      });
      settaskTitle("");
      setTaskdesc("");
      setassignedemp("");
      setsuggestions([]);
      fetchTasks(); // refresh tasks
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
      <h2 className="text-center text-3xl font-semibold mb-5">Assign Task</h2>

      {/* Task Title with AI Suggestions */}
      <div className="input-group mb-4 relative">
        <label className="block">Task Title</label>
        <input
          type="text"
          value={taskTitle}
          onChange={handleTaskSuggestion}
          className="w-full border p-2"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full mt-1 max-h-40 overflow-y-auto z-50">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  settaskTitle(s);
                  setsuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="input-group mb-4">
        <label className="block">Task Description</label>
        <textarea
          value={Taskdesc}
          onChange={(e) => setTaskdesc(e.target.value)}
          className="w-full border p-2"
        />
      </div>

      <div className="input-group mb-4">
        <label className="block">Assign Employee</label>
        <select
          value={assignedemp}
          onChange={(e) => setassignedemp(e.target.value)}
          className="w-full border p-2"
        >
          <option value="">Select Employee</option>
          {employee.map((emp, index) => (
            <option key={emp.empid + index} value={emp.empname}>
              {emp.empname}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={Handleassigntask}
        className="w-full bg-indigo-500 text-white py-3 rounded"
      >
        Assign Task
      </button>
    </div>
  );
};

export default Taskmanagement;
