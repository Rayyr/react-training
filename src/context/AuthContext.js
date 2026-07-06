import { createContext, useState } from "react";

export const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //login function
  const login = async (username, email) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}`);
      if (!res.ok) throw new Error("failed to fetch students from DB!");
      const students = await res.json();
      const user = checkIfValidUser(students, username, email);

      if (user){ setUser(user); return true}
      else return false;
    } catch (error) {
        return false;
    }
  };

  const checkIfValidUser = (students, username, email) => {
    //key:username    value:email
    return students.find(
      (student) => student.username === username && student.email === email,
    );
  };

  return <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>;
};
