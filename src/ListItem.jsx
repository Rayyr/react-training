import React from "react";
import "./List.css";

function ListItem({ onDelete, taskContent, id }) {
  return (
    <div className="added-task" key={id} data-testid={`task-${id}`}>
      <p>{taskContent}</p>
      <button data-testid={`del-btn-${id}`}  onClick={onDelete}>Delete Task</button>
    </div>
  );
}

export default ListItem;
