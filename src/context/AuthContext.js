import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
    //user : admin or student
  const [user, setUser] = useState(null);

  //restore logged user session from local storage
  // ✅ restore session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  //login function
  const login = async (username, email, role) => {
    let endpoint = "";
    if (role === "admin") endpoint = "/admins";
    else if (role === "student") endpoint = "/students";
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}${endpoint}`,
      );
      if (!res.ok) throw new Error(`failed to fetch ${role}s from DB!`);
      const users = await res.json();
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
    <AuthContext.Provider value={{ user, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
