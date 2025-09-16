import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Employeemanage from "./components/Employeemanage.jsx";
import Taskmanagement from "./components/Taskmanagement.jsx";
import { TaskBoard } from "./components/Employeetabs.jsx";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/emp/emplist");
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
      console.log("Employees:", data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/task/getTaskList");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTaskList(data);
      console.log("Tasks:", data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Fetch both on mount
  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="w-10/12 m-auto flex justify-between gap-5 mt-5">
        {/* Employee Management */}
        <Employeemanage fetchEmployees={fetchEmployees} />

        {/* Task Management */}
        <Taskmanagement employee={employees} fetchTasks={fetchTasks} />
      </div>

      {/* Task Board */}
      <div className="w-10/12 m-auto mt-8">
        <TaskBoard taskList={taskList} refreshTasks={fetchTasks} />
      </div>

      {error && (
        <div className="text-red-500 text-center mt-5">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default App;