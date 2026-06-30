import { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
 
     //shared props , json format
  const [students, setStudents] = useState([]);
  //GET students
    const getStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/students");

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };
 

  useEffect(()=>{getStudents()},[]);


  //POST student
  const addStudent = async (student) => {
    try {
      const res = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (!res.ok) throw new Error("Failed to post the new student");

      setStudents((prevStudents) => [...prevStudents, student]);
    } catch (error) {
      console.error("error");
    }
  };

  // DELETE student by its email
  const removeStudent = async (studentEmailToBeDeleted) => {
    const studentToDelete = students.find(
      (e) => e.email === studentEmailToBeDeleted,
    );

    try {
      const res = await fetch(
        `http://localhost:5000/students/${studentToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      setStudents((prevStudents) =>
        prevStudents.filter((e) => e.email !== studentEmailToBeDeleted),
      );
    } catch (error) {
      console.error(error + "hi");
    }
  };

  // UPDATE student details
  const updateStudentDetails = async (email) => {
    const studentToBeUpdate = students.find((s) => s.email === email);
    const updatedStudent = { ...studentToBeUpdate, course: "new course" };
    try {
      const res = await fetch(
        `http://localhost:5000/students/${studentToBeUpdate.id}`,
        { method: "PUT", body: JSON.stringify(updatedStudent) },
      );

      const data = await res.json();//returned updated student
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s.id === studentToBeUpdate.id ? data : s)),
      );
    } catch (error) {}
  };

  return (
    <StudentContext.Provider
      value={{ students,addStudent, removeStudent, updateStudentDetails }}
    >
      {children}
    </StudentContext.Provider>
  );
};
