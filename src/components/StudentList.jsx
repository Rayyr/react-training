import React from "react";
import ListItem from "./ListItem";

function StudentList({ list }) {
  return (
    <div className="registered-students">
      {list.map((e, ind) => (
        <ListItem content={e} id={ind} />
      ))}
    </div>
  );
}

export default StudentList;
