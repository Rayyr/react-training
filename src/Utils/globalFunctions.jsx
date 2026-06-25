  import {useState} from 'react';
  import React from 'react';
  
  //form blocking state
  const [isBlocked, setIsBlocked] = useState(false); 

   //registered successfullr students array
    //s1:{name: email: gpa:}
    //s2:...
    const [regStudents, setRegStudents] = useState(() => {
      const savedStudents = localStorage.getItem("students");
      return savedStudents ?JSON.parse(savedStudents) :[];
    });

   function addStudent(student) {
    const newStudents = [...regStudents, student];
    setRegStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
    
  }