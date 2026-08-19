import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

   const [admins, setAdmins] = useState([]);
  
   
    useEffect(() => {
    
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/admins`);
        if (!res.ok) {
          throw new Error("Failed to fetch admins from DB!");
        }

        const result = await res.json();
        setAdmins(result);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          GET: error.message,
        }));
      }  
    };
    fetchData();
  }, []);

    
  //POST admin
  const addAdmin = async (admin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      if (!res.ok) {
        throw new Error("Failed to add the new admin");
      }
      const created = await res.json();
      setAdmins((prev) => [...prev, created]);
      setErrors((prev) => ({ ...prev, POST: null }));
      return created;
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        POST: error.message,
      }));
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{ admins,errors, addAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
