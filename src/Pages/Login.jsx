import { AuthContext } from "../context/AuthContext.js";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit =async (e) => {
    e.preventDefault();

   
    const {username,email}=e.target;
     console.log(username.value)
    const isValid = await login(username.value, email.value);
    if (isValid) navigate("/");
    else navigate("/invalidRoute");
  };

 

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username"></input>
        <input name="email" type="email" placeholder="Email"></input>
        <button type="submit">Login</button>
      </form>
      <button onClick={()=>navigate("/register")}>Register</button>
    </>
  );
}

export default Login;
