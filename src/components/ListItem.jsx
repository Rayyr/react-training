import React from "react";

function ListItem({ content, id }) {
  return (
    <div className="student-card" key={id}>
      <p>{content.name}</p>
      <p>{content.email}</p>
      <p>{content.gpa}</p>
      <p>{content.course}</p>
    </div>
  );
}

export default ListItem;
