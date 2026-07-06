import { AuthContext } from "../context/AuthContext.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roles } from "../constatnts/systemRoles.js";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [role, setRole] = useState("student");//default

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, role } = e.target;
    // console.log(user);
    const isValid = await login(username.value, email.value, role.value);
    if (isValid)
      navigate("/home"); //send authonticated users to Home Page
    else navigate("/invalidRoute"); //send unauthonticated (different roles) to Error Page
  };

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username"></input>
        <input name="email" type="email" placeholder="Email"></input>

        {/*role selection for log in */}
        <input
          id="student"
          name="role"
          type="radio"
          value={roles.student}
          checked={role === roles.student}
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="student">Log in as student</label>
        <input
          id="admin"
          name="role"
          type="radio"
          value={roles.admin}
          checked={role === roles.admin}
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="admin">Log in as admin</label>

        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/register")}>Student Register</button>{" "}
      {/*only for students role registeration */}
    </>
  );
}

export default Login;
