import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

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
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        POST: error.message,
      }));
      throw error;
    }
  };

  return (
    <AdminContext.Provider value={{ errors, addAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
