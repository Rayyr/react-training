import React,{useState} from "react";
import RegisterationForm from "./RegisterationForm.jsx";
import FilterBar from "./FilterBar.jsx";
import StudentList from "./StudentList.jsx";

function Dashboard() {
  //registered successfullr students array
  //s1:{name: email: gpa:}
  //s2:...
  const [regStudents, setRegStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

    function addStudent(student) {
    const newStudents = [...regStudents, student];
    setRegStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  }

  function deleteStudent(indexToDelete) {
    const newStudents = regStudents.filter((_, index) => index !== indexToDelete);
    setRegStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  }

  const [filters,setFilters]=useState({
    course:"",
    gpa:"",
    username:""
  });

    //form blocking state
  const [isBlocked, setIsBlocked] = useState(false);


  return (
    <>
      <h1>Well come to Dashboard</h1>
       <FilterBar filters={filters} setFilters={setFilters} />
      <RegisterationForm isBlocked={isBlocked} setIsBlocked={setIsBlocked} onAddStudent={addStudent} regStudents={regStudents} />
            <StudentList
            onDeleteStudent={deleteStudent}
            isBlocked={isBlocked}
            list={regStudents}
          />
    </>
  );
}

export default Dashboard;
