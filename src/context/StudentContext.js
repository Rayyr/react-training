import { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();
//or simplly function StudentProvider ( functional component )
export const StudentProvider = ({ children }) => {
  //shared props , json format
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  //GET students
  const getStudents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/students");

      if (!res.ok) {
    
        throw new Error("Failed to get students from database");
      }

      const data = await res.json(); //students
      setStudents(data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        GET: error.message,//as same as Failed to get students from database (thrown one)
      }));
      
       
    } finally {
      setIsLoading(false);
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
      if (!res.ok) {
     
         throw new Error("Failed to add the new student");
      }
      const createdStudent = await res.json();
      setStudents((prevStudents) => [...prevStudents, createdStudent]);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        POST: error.message,
      }));
       throw error.message;
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
      if (!res.ok) {
      
         throw new Error("Failed to delete student");
      }
      setStudents((prevStudents) =>
        prevStudents.filter((e) => e.email !== studentEmailToBeDeleted),
      );
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        DELETE: error.message,
      }));
      throw error.message;
    }
  };

  // UPDATE student details
  const updateStudentDetails = async (oldEmail, updatedData) => {
    const studentToBeUpdate = students.find((s) => s.email === oldEmail);

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
      if (!res.ok) {
      
        throw new Error("Failed to update student details");
      }
      const data = await res.json();
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.email === studentToBeUpdate.email ? data : s,
        ),
      );
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        PUT: error.message,
      }));
       throw error.message;
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        removeStudent,
        updateStudentDetails,
        isLoading,
        errors,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
