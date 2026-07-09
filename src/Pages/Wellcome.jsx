import StudentItem from "../components/UserDefined UI/StudentItem";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { roles } from "../constatnts/generalConstants";
import GradientText from "../components/BuiltIn UI/GradientText";

function Wellcome({ isBlocked }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px", // spacing between items
          textAlign: "center",
          marginTop:"50px",
          fontSize:"70px"
        }}
      >
        <span style={{color:"#1E293B"}}>
          Wellcome back <GradientText text={`${user.username} `} /> !
        </span>
      </div>
      {user && user.role === roles.student && (
        <StudentItem
          isBlocked={isBlocked}
          onlyDetails={true}
          role={roles.student}
          content={user}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px", // spacing between items
          textAlign: "center",
        }}
      >
        <button   onClick={() => logout()}>
          <svg
            width="48"
            height="48"
            fill="#9C27B0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
 
          >
              
                  
            <path d="M6.5 3.75c-.526 0-1.25.63-1.25 1.821V18.43c0 1.192.724 1.821 1.25 1.821h6.996a.75.75 0 1 1 0 1.5H6.5c-1.683 0-2.75-1.673-2.75-3.321V5.57c0-1.648 1.067-3.321 2.75-3.321h7a.75.75 0 0 1 0 1.5z" />
    <path d="M16.53 7.97a.75.75 0 0 0-1.06 0v3.276H9.5a.75.75 0 0 0 0 1.5h5.97v3.284a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0 .22-.532v-.002a.75.75 0 0 0-.269-.575z" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Wellcome;
