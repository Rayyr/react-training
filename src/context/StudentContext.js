import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  //shared props , json format
  const [students, setStudents] = useState([]);

  //GET students
  const getStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/students");

      if (!res.ok) {
        throw new Error("Failed to get students");
      }

      const data = await res.json(); //students
      setStudents(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

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

      const createdStudent = await res.json();
      setStudents((prevStudents) => [...prevStudents, createdStudent]);
    } catch (error) {
      throw new Error(error);
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
      if (!res.ok) throw new Error("Failed to delete student");

      setStudents((prevStudents) =>
        prevStudents.filter((e) => e.email !== studentEmailToBeDeleted),
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  // UPDATE student details
  const updateStudentDetails = async (oldEmail, updatedData) => {
   
    const studentToBeUpdate = students.find((s) => s.email === oldEmail);
console.log(studentToBeUpdate.id);

    if (!studentToBeUpdate) return; //add error msg

    try {
      const res = await fetch(
        `http://localhost:5000/students/${studentToBeUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );
      if (!res.ok) throw new Error("Failed to update student");

      const data = await res.json();
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.email === studentToBeUpdate.email ? data : s,
        ),
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  
  return (
    <StudentContext.Provider
      value={{ students, addStudent, removeStudent, updateStudentDetails }}
    >
      {children}
    </StudentContext.Provider>
  );
};
