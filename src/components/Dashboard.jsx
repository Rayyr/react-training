import React,{useState} from "react";
import RegisterationForm from "./RegisterationForm.jsx";
import FilterBar from "./FilterBar.jsx";

function Dashboard() {
  //registered successfullr students array
  //s1:{name: email: gpa:}
  //s2:...
  const [regStudents, setRegStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  return (
    <>
      <h1>Well come to Dashboard</h1>
       <FilterBar/>
      <RegisterationForm regStudents={regStudents} setRegStudents={setRegStudents} />
    </>
  );
}

export default Dashboard;
