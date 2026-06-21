import React from "react";
import "./List.css";

function ListItem({ onDelete, taskContent, index }) {
  return (
    <div className="added-task" key={index}>
      <p>{taskContent}</p>
      <button onClick={onDelete}>Delete Task</button>
    </div>
  );
}

export default ListItem;
