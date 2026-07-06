import { createContext, useState,useEffect } from "react";

export const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  //restore logged user session
  useEffect(()=>{
const storedUser=localStorage.getItem("user");
if(storedUser) setUser(JSON.parse(storedUser));
  },[]);



  //login function
  const login = async (username, email) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}`);
      if (!res.ok) throw new Error("failed to fetch students from DB!");
      const students = await res.json();
      const foundUser = checkIfValidUser(students, username, email);

      if (foundUser) {
        //save session
        localStorage.setItem("user", JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      } else return false;
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

  //logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user,login }}>{children}</AuthContext.Provider>
  );
};
