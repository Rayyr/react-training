import "./List.css";
import { useState } from "react";

function List1() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddClick = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
    return;
  };

  
  function handleDeleteClick(indexToDelete) {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="main-container">
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

export default List1;
