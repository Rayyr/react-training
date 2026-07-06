import { AuthContext } from "../context/AuthContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email,role } = e.target;
    // console.log(user);
    const isValid = await login(username.value, email.value,role.value);
    if (isValid)
      navigate("/home"); //send authrized users to Home Page
    else navigate("/invalidRoute"); //send unauthrized users to Error Page
  };

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username"></input>
        <input name="email" type="email" placeholder="Email"></input>

{/*role selection for log in */}
        <input id="student" name="role" type="radio" value="student" checked />
        <label for="student">Log in as student</label>
        <input id="admin" name="role" type="radio" value="admin" />
        <label for="admin">Log in as admin</label>

        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

export default Login;
