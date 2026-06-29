import { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  //shared props
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents === null ? [] : JSON.parse(savedStudents);
  });

  // ✅ Add student
  const addStudent = (newStudent) => {
    setStudents((prevStudents)=>{
    const newStudents = [...prevStudents, newStudent]; 
    localStorage.setItem("students", JSON.stringify(newStudents));//since the setStsate does not make an immediate update on state
    });
  };

  // ✅ Remove student by its email
  const removeStudent = (studentEmailToBeDelted) => {
    setStudents((prevStudents)=>{
    const newStudents = prevStudents.filter((e, _) => e.email !== studentEmailToBeDelted);
    localStorage.setItem("students", JSON.stringify(newStudents));
    });
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, removeStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
