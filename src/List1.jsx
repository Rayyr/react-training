import "./List.css";
import { useState } from "react";

function List1() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleAddClick = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      completed: false,
      content: task,
    };
    setTasks([...tasks, newTask]);
    setTask("");
    return;
  };

  function handleDeleteClick(indexToDelete) {
    setTasks(tasks.filter((t) => t.id !== indexToDelete));
  }

  function toggleStatus(id) {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task 
    );
    setTasks(newTasks);
    return;
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed === true;
    if (filter === "Active") return t.completed === false;
    return true;
  });


  

  return (
    <div className="main-container">
      <h1>To Do List without localstorage</h1>
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

      <div classNames="filters">
        <button className={filter==="All"?"colored":"plain"} onClick={() => setFilter("All")}>All</button>
        <button className={filter==="Completed"?"colored":"plain"} onClick={() => setFilter("Completed") }>Completed</button>
        <button className={filter==="Active"?"colored":"plain"} onClick={() => setFilter("Active") }>Active</button>
      </div>

      <div className="tasks">
        {filteredTasks.map((t) => (
          <div className="added-task" key={t.id}>
            <p>{t.content}</p>
            <button onClick={() => toggleStatus(t.id)}>
              {t.completed ? "Completed" : "Active"}
            </button>
            <button onClick={() => handleDeleteClick(t.id)}>Delete Task</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List1;
