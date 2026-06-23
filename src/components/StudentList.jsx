import React from "react";
import ListItem from "./ListItem";

function StudentList({ list ,isBlocked}) {
  return (
    <div className="registered-students">
      {list.map((e, ind) => (
        <ListItem content={e} key={ind} isBlocked={isBlocked} />
      ))}
    </div>
  );
}

export default StudentList;
