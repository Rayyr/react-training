import React from "react";
import ListItem from "./StudentItem";

function StudentsList({ onDeleteStudent, list, isBlocked }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
        padding: "20px",
        overflowX: "auto", // 🔥 allows horizontal scroll
      }}
    >
      {list.map((e, ind) => (
        <ListItem
          onDeleteStudent={() => onDeleteStudent(ind)}
          content={e}
          key={ind}
          isBlocked={isBlocked}
        />
      ))}
    </div>
  );
}

export default StudentsList;
