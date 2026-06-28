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
    const newStudents = [...students, newStudent]; //since the setStsate does not make an immediate update on state
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  };

  // ✅ Remove student
  const removeStudent = (indexToBeDelted) => {
    const newStudents = students.filter((_, i) => i !== indexToBeDelted);
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, removeStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
