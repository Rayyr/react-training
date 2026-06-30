import React, { useState, useContext } from "react";
import StudentItem from "../components/StudentItem";
import FilterBar from "../components/FilterBar";
import { Typography } from "@mui/material";
import { StudentContext } from "../context/StudentContext.js";

function StudentsList( ) {
  const { removeStudent, students } = useContext(StudentContext);

  const [filters, setFilters] = useState({
    course: "",
    gpa: "",
    username: "",
  });

  const filteredStudents = students.filter((student) => {
    const matchesUsername =
      filters.username === "" ||
      student.username.toLowerCase()===(filters.username.toLowerCase());

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
            display: "flex",
            flexWrap: "wrap",
            gap: "100px",
            padding: "20px",
            justifyContent: "flex-start",
          }}
        >
          {filteredStudents.map((e, ind) => (
            <StudentItem
              onDeleteStudent={() => removeStudent(e.email)}
              content={e}
              key={e.email}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default StudentsList;
