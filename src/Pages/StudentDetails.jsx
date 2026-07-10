import { useParams } from "react-router-dom";
import StudentItem from "../components/UserDefined UI/StudentItem.jsx";
import { StudentContext } from "../context/StudentContext.js";
import { useContext } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { roles } from "../constatnts/generalConstants.js"; 
import { toast } from "react-toastify";
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText.jsx";

function StudentDetails({isBlocked,setIsBlocked} ) {
  const { removeStudent,students, isLoading, errors } = useContext(StudentContext);

  const { email } = useParams();

 
  //if not found in list undefined will be returned
  const student = students.find((student) => student.email === email);

  
    const handleDelete = async (e) => {
      try {
        await removeStudent(e.email);
        toast.success("Student has been deleted successfully!", {
          style: {
            width: "500px",
          },
          onOpen: () => setIsBlocked(true),
          onClose: () => setIsBlocked(false),
        });
      } catch (err) {
        toast.error(err.message || errors.DELETE , {
          style: {
            width: "500px",
          }, 
          onOpen: () => setIsBlocked(true),
          onClose: () => setIsBlocked(false),
        });
      }
    };

  return (
    <div>
      {!errors.GET ? (
        isLoading === false ? (
          !student ? (
            <>
              {" "}
              <h1>Error 404</h1>
              <h1>
                Sorry,there is no user associated with this email: {email} !
              </h1>{" "}
            </>
          ) : (
            <>
              
             <BubbleText color="#9C27B0" fontSize="70px">Student Details</BubbleText>
              <StudentItem   onDeleteStudent={handleDelete} isBlocked={isBlocked} role={roles.admin} onlyDetails={true} content={student}  />
            </>
          )
        ) : (
             <Box sx={{ color:"#4A148C",display: 'flex' }}>
      <CircularProgress aria-label="Loading…" />
    </Box>
        )
      ) : (
        <h1>{errors.GET}</h1>
      )}
    </div>
  );
}

export default StudentDetails;
