import React from "react";
import ListItem from "./ListItem";

function StudentList({ onDeleteStudent,list, isBlocked }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        overflowX: "auto", // 🔥 allows horizontal scroll
      }}
    >
      {list.map((e, ind) => (
        <ListItem onDeleteStudent={()=>onDeleteStudent(ind)} content={e} key={ind} isBlocked={isBlocked} />
      ))}
    </div>
  );
}

export default StudentList;
