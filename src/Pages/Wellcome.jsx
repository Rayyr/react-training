import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Wellcome() {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <h1>wellcome page</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default Wellcome;
