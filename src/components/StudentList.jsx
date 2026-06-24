import React from "react";
import ListItem from "./ListItem";

function StudentList({ list, isBlocked }) {
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
        <ListItem content={e} key={ind} isBlocked={isBlocked} />
      ))}
    </div>
  );
}

export default StudentList;
