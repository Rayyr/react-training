import React, { useContext } from "react";
import { toast } from "react-toastify";
import "../styles/RegisterationForm.css";
import { Input, Box } from "@mui/material";
import PreviewCard from "../components/UserDefined UI/PreviewCard.jsx";
import { StudentContext } from "../context/StudentContext.js";
import useForm from "../hooks/useForm.js";
import validateForm from "../utils/validateForm.js";
import Button from "../components/BuiltIn UI/Button.jsx";

function RegistrationForm({ isBlocked, setIsBlocked }) {
  const { errors, students, addStudent } = useContext(StudentContext);

  const { formData, handleChange, handleSubmit } = useForm(
    {
      //1st param of hook formData
      username: "",
      email: "",
      course: "",
      gpa: "",
    },
    (formData) => validateForm(formData, students, toast, setIsBlocked), //2nd param of hook validateForm
    (formData) => {
      //3rd param of hook onSubmit
      addStudent(formData)
        .then(() => {
          toast.success("New student has been registerd successfully!", {
            style: {
              width: "500px",
            },
            onOpen: () => setIsBlocked(true),
            onClose: () => setIsBlocked(false),
          });
        })
        .catch((err) => {
          toast.error(err || errors.POST || "Failed to add new student", {
            style: {
              width: "500px",
            },
            onOpen: () => setIsBlocked(true),
            onClose: () => setIsBlocked(false),
          });
        });
    },
  );

  const inputStyle = {
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
      borderBottom: "3px solid #4A148C",
    },
  };
  return (
  
    <>
    <h1>Student Registeration Form</h1>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
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
                placeholder="Username*"
                value={formData.username}
                onChange={(e) => handleChange(e)}
                disabled={isBlocked}
                autoFocus={true}
                sx={inputStyle}
              ></Input>{" "}
              <br />
              <Input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                disabled={isBlocked}
                sx={inputStyle}
              ></Input>{" "}
              <br />
              <Input
                type="number"
                name="gpa"
                placeholder="GPA*"
                value={formData.gpa}
                onChange={(e) => handleChange(e)}
                step="0.01"
                disabled={isBlocked}
                sx={inputStyle}
              ></Input>{" "}
              <br />
              <Input
                type="text"
                name="course"
                placeholder="Course*"
                value={formData.course}
                onChange={(e) => handleChange(e)}
                disabled={isBlocked}
                sx={inputStyle}
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
                style={{
                  
                  background: "linear-gradient(45deg, #4A148C, #9C27B0)", // 💜 gradient
                  color: "#9527A9",
                  fontWeight:"bold"
                }}
              >
                Register 
              </Button> 
            </form>
          </div>

          <div className="child2">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <PreviewCard content={formData} />
            </div>
          </div>
        </div>
      </Box>
      </>
   
  );
}

export default RegistrationForm;
