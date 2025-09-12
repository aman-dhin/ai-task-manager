import Employeemanage from "./components/Employeemanage.jsx";
import Header from "./components/Header.jsx";

import React, { useEffect, useState } from 'react'
import Taskmanagement from "./components/Taskmanagement.jsx";
import { TaskBoard } from "./components/Employeetabs.jsx";
 
const App = () => {

   const [employees,setemployees] =useState([]);
  const [Tasklist,setTasklist] =useState([]);
   const [error,seterror] =useState(null);
    

  useEffect(()=>{
    fetch("http://localhost:5500/api/emp/emplist")
    .then((response)=>{
      if(!response.ok){
        throw new Error ("failed  to fetch employee")
       
       
      }
      return response.json("");
    })
    .then( (data)=>{
      setemployees(data);
      console.log("emp data",data);
      

    })
    .catch(()=>{
       seterror(error.message);
    })
  },[]);
  useEffect(()=>{
    fetch("http://localhost:5500/api/task/getTaskList")
    .then((response)=>{
      if(!response.ok){
        throw new Error ("failed  to fetch employee")
       
       
      }
      return response.json("");
    })
    .then( (data)=>{
      setTasklist(data);
     // console.log("emp data",data);
      

    })
    .catch((Error)=>{
       seterror(Error.message);
    })
  },[]);
  return (
    <div className="bg-gray-100 h-screen">
    <Header/>
    <div className=" w-10/12 m-auto flex justify-between">
    
     <Employeemanage/>
      <Taskmanagement employee={employees}/>
     
    
    
    </div>

    <TaskBoard employees={employees} taskList={Tasklist}/>
    
    
     </div>
     
   
  )
}

export default App
