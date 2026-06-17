import "./List.css";
import { useState } from "react";

function List2() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(()=>{
    const savedTasks=localStorage.getItem("tasks");
    return savedTasks?JSON.parse(savedTasks):[];
  });

  const handleAddClick = () => {
    if (task.trim() === "") return;
    const newTasks=[...tasks, task];
    setTasks(newTasks);
    setTask("");
    localStorage.setItem("tasks",JSON.stringify(newTasks));
    return;
  };

  

   function handleDeleteClick(indexToDelete) {
    const newTasks=tasks.filter((_, index) => index !== indexToDelete);
    setTasks(newTasks);
    localStorage.setItem("tasks",JSON.stringify(newTasks));
    return;
  }

  return (
    <div className="main-container">
      <h1 data-testid="title">To Do List with localstorage</h1>
     <div className="task-bar">
      <form>
        <input
          type="text"
          id="task-content"
          style={{ width: "500px" }}
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
      </form>

      <button onClick={handleAddClick}>Add Task</button>
      </div>

      <div className="tasks">
        {tasks.map((t, index) => (
          <div className="added-task" key={index}>
            <p>{t}</p>
            <button onClick={()=>handleDeleteClick(index)}>Delete Task</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List2;
