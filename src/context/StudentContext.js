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

  // ✅ Remove student by its email
  const removeStudent = (studentEmailToBeDelted) => {
    const newStudents = students.filter((e, _) => e.email !== studentEmailToBeDelted);
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, removeStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
