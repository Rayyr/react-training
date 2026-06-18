function Tasks({ tasks, filter, toggleStatus, handleDeleteClick }) {
  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Active") return !t.completed;
    return true;
  });

  return (
    <div className="tasks">
      {filteredTasks.map((t) => (
        <div className="added-task" key={t.id}>
          <p>{t.content}</p>

          <button onClick={() => toggleStatus(t.id)}>
            {t.completed ? "Completed" : "Active"}
          </button>

          <button onClick={() => handleDeleteClick(t.id)}>
            Delete Task
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;