import "./App.css";
 import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import About from "./pages/About.jsx";
import RegisterationForm from "./pages/RegisterationForm.jsx";
import { useState } from "react";
import StudentDetails from "./pages/StudentDetails.jsx";
import NavBar from './components/NavBar.jsx';
import Error from './pages/Error.jsx';

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

    <>
    <NavBar/>
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
      <Route path="/students/:email" element={<StudentDetails students={regStudents}/>} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Error/>}/>
     </Routes>
     </>
  );
}

export default App;
