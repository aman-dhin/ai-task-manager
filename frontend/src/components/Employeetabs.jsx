export const  TaskBoard =({taskList})=>{
    return (
        <div className="bg-white mt-5">
          <h3 className="text-3xl font-bold">Task board </h3>
          <ul >
          {
            taskList.map((Task)=>(
                <li className="bg-white mx-3 p-5    " key={Task.taskTitle } >
                  <p> {Task.empName}</p> 
                  <p>{Task.taskTitle}</p>
                  <p>{Task.Taskdesc}</p>
                  <p>{Task.estimatedTime}</p>
                </li>
            ))
          }



          </ul>
        </div>
       

    )
}