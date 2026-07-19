import { createContext, useState, useEffect, useContext } from "react";
import { roles } from "../constatnts/generalConstants";
import { StudentContext } from "./StudentContext";
import api from "../api/axios";

export const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
  //user : admin or student
  // Initialize state from localStorage to persist session on refresh
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const { students } = useContext(StudentContext);

  /*eslint-disable react-hooks/exhaustive-deps */
  //make a sync in case i uodate the current user , so user state which is stored in local storage will contain the old content
  useEffect(() => {
    let updatedUser = students.find((s) => s.id === user?.id);
    if (updatedUser) {
      updatedUser = { ...updatedUser, role: user.role };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  }, [students]);
  /*eslint-enable react-hooks/exhaustive-deps */

  //local storage for user session mangmnet
  //login function
  const login = async (username, email, role) => {
    let endpoint = "";
    if (role === roles.admin) endpoint = "/admins";
    else if (role === roles.student) endpoint = "/students";
    try {
      const res = await api.get(endpoint);

      /*  const res = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}${endpoint}`,
      ); */
      //  if (!res.ok) throw new Error(`failed to fetch ${role}s from DB!`);
      // const users = await res.json();
      const users = res.data;
      const foundUser = checkIfValidUser(users, username, email);

      if (foundUser) {
        const unifiedUser = { ...foundUser, role: role };
        //save session
        localStorage.setItem("user", JSON.stringify(unifiedUser));
        setUser(unifiedUser);
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  //for both students and admins
  const checkIfValidUser = (users, username, email) => {
    //key:username    value:email
    return users.find((u) => u.username === username && u.email === email);
  };

  //logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
