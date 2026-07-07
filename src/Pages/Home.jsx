import React from "react";
 import { useNavigate } from "react-router-dom";
 
function Home() {
 const navigate=useNavigate();

  return (
    <>
      <h1>Wellcome to home page!</h1>
     <button onClick={() => navigate("/login")}>Login page</button>  
      <button onClick={() => navigate("/register")}>Register page</button>

    </>
  );
}

export default Home;
