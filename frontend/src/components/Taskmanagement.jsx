import axios from "axios";
import React, { useState } from "react";

const Taskmanagement = ({ employee }) => {
  const [taskTitle, settaskTitle] = useState("");
  const [Taskdesc, setTaskdesc] = useState("");
  const [assignedemp, setassignedemp] = useState("");
  const [suggestions, setsuggestions] = useState([]);
 

  // Auto-completion suggestion API
  const handleTasksugggesstion = async (e) => {
    const value = e.target.value;
    settaskTitle(value);

    if (value.length > 3) {
      try {
        const response = await axios.post(
          "http://localhost:5500/api/task/suggest",
          { input: value }
        );
        setsuggestions(response.data.suggestions || []);
      } catch (error) {
        console.log("Error while fetching suggestions:", error);
      }
    } else {
      setsuggestions([]);
    }
  };

  // Create task
  const Handleassigntask = async () => {
    try {
      await axios.post("http://localhost:5500/api/task/create", {
        taskTitle,
        Taskdesc,
        empname: assignedemp,
      });

      // Reset state
      settaskTitle("");
      setTaskdesc("");
      setassignedemp("");
      setsuggestions([]);
    } catch (error) {
      console.error("Error creating a task :", error);
    }
  };

  return (
    <div className="task-wrapper bg-white shadow-md rounded p-5 w-7/12">
      <h2 className="text-center text-3xl font-semibold mb-5">Assign Task</h2>

      <div className="input-group mb-4">
        <label className="block"> Enter Task Title </label>
        <input
          type="text"
          placeholder=" Enter Task Title "
          className="w-full border p-2"
          value={taskTitle}               // ✅ controlled input
          onChange={handleTasksugggesstion} // ✅ use suggestion function
        />

        {/* ✅ Suggestion dropdown */}
        {suggestions.length > 0 && (
          <ul className="border p-2 bg-gray-100 mt-2 rounded">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="p-1 cursor-pointer hover:bg-gray-200"
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
        <label className="block"> Enter Task Description </label>
        <textarea
          placeholder=" Enter Task description "
          className="w-full border p-2"
          value={Taskdesc}
          onChange={(e) => setTaskdesc(e.target.value)}
        />
      </div>

      <div className="input-group mb-4">
        <label className="block"> Select Employee </label>
        <select
          className="border w-full p-2"
          value={assignedemp}
          onChange={(e) => setassignedemp(e.target.value)}
        >
          <option value=""> select employee </option>
          {employee.map((emp) => (
            <option key={emp.empid} value={emp.empname}>
              {emp.empname}
            </option>
          ))}
        </select>
      </div>

      <div className="btn-group text-center">
        <button
          onClick={Handleassigntask} // ✅ now button works
          className="w-1/2 bg-indigo-500 text-white py-3"
        >
          Assign Task
        </button>
      </div>
    </div>
  );
};

export default Taskmanagement;
