import axios from 'axios'

import React, { useState } from 'react'

const Employeemanage = () => {

  const [empId,setEmpId]=useState("");
  const [empName,setempName] =useState("");
  const [empSkills,setempSkills]=useState("");

  const handleAddemp = async (e)=>{
    e.preventDefault();

    try {
      const res =await axios.post("http://localhost:5500/api/emp/create",{empId,empName,empSkills});
        setEmpId("");
        setempName("");
        setempSkills("");
        console.log("employee created ",res.data);
        
    } 
    catch(error){
      console.log("error creating new emp",error);
      

    }

  }
  return (
    <div className='emp-wrapper bg-white shadow-md rounded p-5 w-1/3'>
       <h2 className='text-center text-3xl font-semibold mb-5'>Add Employee</h2>
       <div className='input-group mb-4'>  
        <label className='block' > Enter Emp Id </label>  
        <input type="text"
         placeholder=' Enter Emp Id' 
         className=' w-full border p-2'
         value={empId}
         onChange={(e)=> setEmpId(e.target.value)} />
        </div>
        <div className='input-group mb-4'>  
        <label className='block' > Enter Emp Name </label>  
        <input type="text" placeholder=' Enter EMP NAme' className=' w-full border p-2'
          value={empName}
         onChange={(e)=> setempName(e.target.value)} />
        </div>
        <div className='input-group mb-4 '>  
        <label className='block' > Enter Emp Skills </label>  
        <input type="text" placeholder=' Enter Emp SKIlls' className=' w-full border p-2' 
         value={empSkills}
       onChange={(e)=> setempSkills(e.target.value)}/>
        </div>
           <div className='btn-group text-center'>

            <button className='w-1/2 bg-indigo-500 text-white py-3'
              onClick={handleAddemp}
            >
            
             Add  NEW  Emp</button>
           </div>
    </div>
  )
}

export default Employeemanage
