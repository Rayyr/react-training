import React, { useState } from "react";
import RegisterationForm from "./RegisterationForm.jsx";
import FilterBar from "./FilterBar.jsx";
import StudentList from "./StudentList.jsx";
 import { Typography} from "@mui/material";

function Dashboard() {
  
   
  //registered successfullr students array
  //s1:{name: email: gpa:}
  //s2:...
  const [regStudents, setRegStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ?JSON.parse(savedStudents) :[];
  });

  function addStudent(student) {
    const newStudents = [...regStudents, student];
    setRegStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
    
  }

  function deleteStudent(indexToDelete) {
    const newStudents = regStudents.filter(
      (_, index) => index !== indexToDelete,
    );
    setRegStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  }

  //form blocking state
  const [isBlocked, setIsBlocked] = useState(false);

  const [filters, setFilters] = useState({
    course: "",
    gpa: "",
    username: "",
  });

  const filteredStudents = regStudents.filter((student) => {
    const matchesUsername =
      filters.username === "" ||
      student.username.toLowerCase().includes(filters.username.toLowerCase());

    const matchesGpa = filters.gpa === "" || student.gpa === filters.gpa;

    const matchesCourse =
      filters.course === "" || student.course === filters.course;

      
    return matchesUsername && matchesGpa && matchesCourse;
     
    //empty here mean all filter
  });

  const nothingFound = filteredStudents.length === 0;

  return (
    <>
      <h1>Well come to Dashboard</h1>
      <FilterBar filters={filters} setFilters={setFilters} isBlocked={isBlocked}/>
      <RegisterationForm
        isBlocked={isBlocked}
        setIsBlocked={setIsBlocked}
        onAddStudent={addStudent}
        regStudents={regStudents}
      />
      {nothingFound===true?(
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
):(
      <StudentList
        onDeleteStudent={deleteStudent}
        isBlocked={isBlocked}
        list={filteredStudents}
      />
      )}
    </>
  );
}

export default Dashboard;
