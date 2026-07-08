import StudentItem from "../components/UserDefined UI/StudentItem";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { roles } from "../constatnts/generalConstants";

function Wellcome({isBlocked}) {
  const { user,logout } = useContext(AuthContext);
 
  return (
    <>
    {user && user.role===roles.student&& <StudentItem isBlocked={isBlocked} onlyDetails={true} role={roles.student} content={user}/>}
      <h1>wellcome page</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default Wellcome;
