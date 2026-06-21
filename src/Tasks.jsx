import Button from './Button.jsx';

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

          <Button onClick={() => toggleStatus(t.id)} content={t.completed ? "Completed" : "Active"}/>
          <Button onClick={() => handleDeleteClick(t.id)} content="Delete Task"/>
        </div>
      ))}
    </div>
  );
}

export default Tasks;