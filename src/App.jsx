import "./List.css";
import { useState } from "react";
import FilterBar from "./FilterBar";
import Tasks from "./Tasks";

function App() {
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
  };

  function handleDeleteClick(idToDelete) {
    setTasks(tasks.filter((t) => t.id !== idToDelete));
  }

  function toggleStatus(id) {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );

    setTasks(newTasks);
  }

  return (
    <div className="main-container">
      <h1>To Do List</h1>

      <div className="task-bar">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAddClick}>Add Task</button>
      </div>

      <FilterBar filter={filter} setFilter={setFilter} />

      <Tasks
        tasks={tasks}
        filter={filter}
        toggleStatus={toggleStatus}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

export default App;