import React, { useState } from "react";
import StudentItem from "../components/StudentItem";
import FilterBar from "../components/FilterBar";
import { Typography } from "@mui/material";

function StudentsList({ onDeleteStudent, list, isBlocked }) {
  const [filters, setFilters] = useState({
    course: "",
    gpa: "",
    username: "",
  });

  const filteredStudents = list.filter((student) => {
    const matchesUsername =
      filters.username === "" ||
      student.username.toLowerCase().includes(filters.username.toLowerCase());

    const matchesGpa = filters.gpa === "" || student.gpa === filters.gpa;

    const matchesCourse =
      filters.course === "" || student.course === filters.course;

    return matchesUsername && matchesGpa && matchesCourse;

    //empty here mean all filter
  });

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        isBlocked={isBlocked}
      />

      {filteredStudents.length === 0 ? (
        <Typography
          variant="h5"
          sx={{
            marginTop: "30px",
            textAlign: "center",
            color: "#B39DDB",
            fontWeight: "bold",
          }}
        >
          No students found 😕
        </Typography>
      ) : (
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    justifyContent:"center"
  }}
>
          {filteredStudents.map((e, ind) => (
            <StudentItem
              onDeleteStudent={() => onDeleteStudent(ind)}
              content={e}
              key={ind}
              isBlocked={isBlocked}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default StudentsList;
