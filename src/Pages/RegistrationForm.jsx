import React, {  useContext } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "../styles/RegisterationForm.css";
import { Input, Button, Box } from "@mui/material";
import PreviewCard from "../components/PreviewCard.jsx";
import { StudentContext } from "../context/StudentContext.js";
import useForm from '../hooks/useForm.js';
import validateForm from '../Utils/validateForm.js';


function RegistrationForm({ isBlocked, setIsBlocked }) {
  const { students, addStudent } = useContext(StudentContext);
   
  const { formData, handleChange, handleSubmit } = useForm(
    {//1st param of hook formData
      username: "",
      email: "",
      course: "",
      gpa: "",
    },
    (formData) => validateForm(formData, students, toast, setIsBlocked),//2nd param of hook validateForm
    (formData) => {//3rd param of hook onSubmit
      addStudent(formData);

    toast.success("New student has been registered succesfully!", {
      style: {
        width: "500px",
      },
      onOpen: () => setIsBlocked(true),
      onClose: () => setIsBlocked(false),
    });
    }
  );
 
  
  return (
    <Box
      sx={{
        backgroundColor: "#eeeeee", // light grey
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <div className="main-cont">
        <div className="child1">
          <form id="stu-form" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              disabled={isBlocked}
              autoFocus={true}
              sx={{
                color: "#7B1FA2", // 🔥 darker purple (typed text)
                fontSize: "22px",
                padding: "16px 0",
                width: "100%",

                "&::placeholder": {
                  color: "#B39DDB", // keep placeholder lighter
                  opacity: 0.7,
                },

                "&:before": {
                  borderBottom: "2px solid #4A148C",
                },

                "&:after": {
                  borderBottom: "3px solid #BB86FC",
                },
              }}
            ></Input>{" "}
            <br />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              disabled={isBlocked}
              sx={{
                color: "#7B1FA2", // 🔥 darker purple (typed text)
                fontSize: "22px",
                padding: "16px 0",
                width: "100%",

                "&::placeholder": {
                  color: "#B39DDB", // keep placeholder lighter
                  opacity: 0.7,
                },

                "&:before": {
                  borderBottom: "2px solid #4A148C",
                },

                "&:after": {
                  borderBottom: "3px solid #BB86FC",
                },
              }}
            ></Input>{" "}
            <br />
            <Input
              type="number"
              name="gpa"
              placeholder="GPA"
              value={formData.gpa}
              onChange={(e) => handleChange(e)}
              step="0.01"
              disabled={isBlocked}
              sx={{
                color: "#7B1FA2", // 🔥 darker purple (typed text)
                fontSize: "22px",
                padding: "16px 0",
                width: "100%",

                "&::placeholder": {
                  color: "#B39DDB", // keep placeholder lighter
                  opacity: 0.7,
                },

                "&:before": {
                  borderBottom: "2px solid #4A148C",
                },

                "&:after": {
                  borderBottom: "3px solid #BB86FC",
                },
              }}
            ></Input>{" "}
            <br />
            <Input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={(e) => handleChange(e)}
              disabled={isBlocked}
              sx={{
                color: "#7B1FA2", // 🔥 darker purple (typed text)
                fontSize: "22px",
                padding: "16px 0",
                width: "100%",

                "&::placeholder": {
                  color: "#B39DDB", // keep placeholder lighter
                  opacity: 0.7,
                },

                "&:before": {
                  borderBottom: "2px solid #4A148C",
                },

                "&:after": {
                  borderBottom: "3px solid #BB86FC",
                },
              }}
            ></Input>{" "}
            <br />
            <Button
              type="submit"
              disabled={
                !formData.username ||
                !formData.email ||
                !formData.gpa ||
                !formData.course ||
                isBlocked
              }
              sx={{
                marginTop: "20px",
                padding: "12px 24px",
                fontSize: "18px",
                borderRadius: "10px",
                textTransform: "none",

                background: "linear-gradient(45deg, #4A148C, #9C27B0)", // 💜 gradient
                color: "#fff",

                "&:hover": {
                  background: "linear-gradient(45deg, #6A1B9A, #BB86FC)",
                },

                "&:active": {
                  transform: "scale(0.98)",
                },

                "&.Mui-disabled": {
                  background: "#2A1B3D",
                  color: "#FFFFFF",
                  pointerEvents: "auto",
                  cursor: "not-allowed",
                  opacity: 0.7,
                },
              }}
            >
              Register student
            </Button>
          </form>
        </div>

        <div className="child2">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <PreviewCard content={formData} />
          </div>
        </div>

  
      </div>
    </Box>
  );
}

export default RegistrationForm;