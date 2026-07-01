import { useParams } from "react-router-dom";
import StudentItem from "../components/StudentItem.jsx";
import { StudentContext } from "../context/StudentContext.js";
import { useContext } from "react";

function StudentDetails() {
  const { students, isLoading, errors } = useContext(StudentContext);

  const { email } = useParams();

  //if not found in list undefined will be returned
  const student = students.find((student) => student.email === email);

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
              <h2>Student Details</h2>
              <StudentItem onlyDetails={true} content={student} />
            </>
          )
        ) : (
          <h1>Loading...</h1>
        )
      ) : (
        <h1>{errors.GET}</h1>
      )}
    </div>
  );
}

export default StudentDetails;
