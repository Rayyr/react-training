import { Input, Modal, Button, Box, Typography } from "@mui/material";
import { StudentContext } from "../context/StudentContext.js";
import { useContext ,useState} from "react";

export default function UpdateForm({ open, onClose, content }) {
   const { updateStudentDetails } = useContext(StudentContext);


    const [formData, setFormData] = useState({
    username: content.username,
    email: content.email, //unique
    course: content.course,
    gpa: content.gpa,
  });

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setFormData((prevState)=>({...prevState,[name]:value}))
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const newData = {
      email: e.target.email.value,
      username: e.target.username.value,
      course: e.target.course.value,
      gpa: e.target.gpa.value,
    };
    updateStudentDetails(content.email,newData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleUpdate}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 360,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Update Student
          </Typography>

          <Input
            fullWidth
            name="username"
            value={formData.username}
            placeholder={content?.username || "Username"}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            fullWidth
            name="email"
            value={formData.email}
            placeholder={content?.email || "Email"}
             onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            fullWidth
            name="course"
            value={formData.course}
            placeholder={content?.course || "Course"}
             onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Input
            fullWidth
            name="gpa"
            value={formData.gpa}
            placeholder={content?.gpa || "GPA"}
             onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
