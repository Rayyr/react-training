import { Input, Modal, Button, Box, Typography } from "@mui/material";
import { StudentContext } from "../context/StudentContext.js";
import { useContext, useState } from "react";
import useForm from "../hooks/useForm.js";
import validateForm from "../Utils/validateForm.js";
import { toast } from "react-toastify";

export default function UpdateForm({ open, onClose, content }) {
  const { students, updateStudentDetails } = useContext(StudentContext);

  const [isBlocked, setIsBlocked] = useState(false);

  const student=students.find((s)=>s.email===content.email);

  const { formData, handleChange, handleSubmit } = useForm(
    //initial values 1st param
    {
      username: content.username,
      email: content.email, //unique
      course: content.course,
      gpa: content.gpa,
    },
//i set isUpdateOp param in validateForm=true then i can access the id otherwise(add operation) then there is no passed id 
    (formData) => validateForm({...formData,"id":student.id}, students, toast, setIsBlocked,true), //2nd param validatForm()
    (formData) => {
      //3rd param of hook onSubmit here the submission means updateStudent info
    
      updateStudentDetails(content.email, formData);
  
      toast.success("Student details has been updated succesfully!", {
        style: {
          width: "500px",
        },
        onOpen: () => {setIsBlocked(true)},
        onClose: () => {setIsBlocked(false);onClose()},
      });
     
    },
    true
  );
 
   
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
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
            placeholder="Username"
            onChange={handleChange}
            disabled={isBlocked}
            autoFocus={true}
            sx={{ mb: 2 }}
          />
          <Input
            fullWidth
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            disabled={isBlocked}
            autoFocus={true}
            sx={{ mb: 2 }}
          />
          <Input
            fullWidth
            name="course"
            value={formData.course}
            placeholder="Course"
            onChange={handleChange}
            disabled={isBlocked}
            autoFocus={true}
            sx={{ mb: 2 }}
          />
          <Input
            fullWidth
            name="gpa"
            value={formData.gpa}
            placeholder="GPA"
            onChange={handleChange}
            disabled={isBlocked}
            autoFocus={true}
            sx={{ mb: 2 }}
          />

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>

            <Button
              disabled={
                !formData.email ||
                !formData.username ||
                !formData.course ||
                !formData.gpa ||
                isBlocked
              }
              type="submit"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
