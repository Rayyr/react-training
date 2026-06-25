import { useParams } from "react-router-dom";
import StudentItem from '../components/StudentItem.jsx';

function StudentDetails({ students }) {
  const { email } = useParams();

 const student = students.find(
  (student) => student.email === email
);

  return (
    <div>
      <h2>Student Details</h2>
 
      <StudentItem onlyDetails={true} content={student}/>
    </div>
  );
}

export default StudentDetails;
