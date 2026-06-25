import { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(()=>{
    const savedStudents=localStorage.getItem("students");
    return savedStudents===null?[]:JSON.parse(savedStudents);  
  });

  // ✅ Add student
  const addStudent = (newStudent) => {
    setStudents((prev) => [
      ...prev,
      newStudent
    ]);
    localStorage.setItem("students",JSON.stringify(students));
  };

  // ✅ Remove student
  const removeStudent = (indexToBeDelted) => {
    setStudents((prev) =>
      prev.filter((_,index) => index !== indexToBeDelted)
    );
        localStorage.setItem("students", JSON.stringify(students));

  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, removeStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};