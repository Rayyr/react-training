import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import About from "./pages/About.jsx";
import RegisterationForm from "./pages/RegisterationForm.jsx";
import { useState } from "react";
 
function App() {
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
    const newStudents = regStudents.filter(
      (_, index) => index !== indexToDelete,
    );
    setRegStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  }

  //form blocking state
  const [isBlocked, setIsBlocked] = useState(false);



  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/students"
        element={
          <StudentsList
            onDeleteStudent={deleteStudent}
            isBlocked={isBlocked}
            list={regStudents}
           
          />
        }
      />
      <Route
        path="/register"
        element={
          <RegisterationForm
            isBlocked={isBlocked}
            setIsBlocked={setIsBlocked}
            onAddStudent={addStudent}
            regStudents={regStudents}
          />
        }
      />
      <Route path="/students/:id" element="StudentDetails.jsx" />
      <Route path="/about" element={<About />} />
      <Route path="/d" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
