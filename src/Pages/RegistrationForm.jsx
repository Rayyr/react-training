import React, { useContext } from "react";
import { toast } from "react-toastify";
import "../styles/RegisterationForm.css";
import { Input, Box } from "@mui/material";
import PreviewCard from "../components/UserDefined UI/PreviewCard.jsx";
import { StudentContext } from "../context/StudentContext.js";
//import useForm from "../hooks/useForm.js"; customized hook
import validateForm from "../utils/validateForm.js";
import Button from "../components/BuiltIn UI/Button.jsx";
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText.jsx";
import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
 
function RegistrationForm({ isBlocked, setIsBlocked }) {
//  const { errors, students, addStudent } = useContext(StudentContext);

  //blueprint for inputs validation
  const formSchema = yup.object({
    username: yup
      .string()
      .required("Username is required!")
      .matches(/^[a-zA-Z0-9]+$/, "only letters , numbers are allowed!"),

    //  if (formData.email.substring(0, atIndex) === formData.username) {

    email: yup
      .string()
      .required("Email is required!") //requirness const
      .matches(/@gmail\.com$/, "Email must end with @gmail.com") //domain const , already is done by built in validation related to email input feild type
      .test(
        //check if first char is a digit or special char
        "first letter of email",
        "Email must not start by digit or special char!",
        (email) => (email ? /^[a-zA-Z]/.test(email) : true),
      )
      .test(
        //check if example != username
        "Not as same as username",
        "Email name must not equal username",
        function (email) {
          const { username } = this.parent;

          if (!email) return true;

          const namePart = email.split("@")[0];
          return namePart !== username;
        },
      )
     , //add unique email const

    gpa: yup
      .number()
      .min(0, "GPA must be >= 0!")
      .max(4, "GPA must be <= 4!")
       .test(
        "decimal-precision",
        "GPA must have max 2 decimal places",
        (value) =>
          value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()),
      )
      .required(),

    course: yup
      .string()
      .matches(/^[a-zA-Z]+$/, "Course must not contain any special characters!")
      .required("Course is required!"),
  });
  const { register, handleSubmit ,formState:{errors,isValid,isSubmitting}} = useForm( {resolver: yupResolver(formSchema),mode: "onChange"});

  /*  const { formData, handleChange, handleSubmit } = useForm(
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
          toast.error(err || errors.POST  , {
            style: {
              width: "500px",
            },
            onOpen: () => setIsBlocked(true),
            onClose: () => setIsBlocked(false),
          });
        });
    },
  );
 */

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


  const makeSubmission=(e)=>{
    console.log(e);
  }
  return (
    <>
      <BubbleText>Student Registeration Form</BubbleText>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
          padding: 3,
        }}
      >
        <div className="main-cont">
          <div className="child1">
            <form id="stu-form" onSubmit={handleSubmit(makeSubmission)}>
              <Input
                type="text"
                name="username"
                placeholder="Username*"
                disabled={isBlocked}
                autoFocus={true}
                sx={inputStyle}
                {...register("username")}
              ></Input>{" "}
{errors.username && <p>{errors.username.message}</p>}
              <br />
              <Input
                type="email"
                name="email"
                placeholder="Email*"
                disabled={isBlocked}
                sx={inputStyle}
                {...register("email")}
              ></Input>{" "}
              {errors.email && <p>{errors.email.message}</p>}

              <br />
              <Input
                type="number"
                name="gpa"
                placeholder="GPA*"
                step="0.01"
                disabled={isBlocked}
                sx={inputStyle}
                {...register("gpa")}
              ></Input>{" "}
              {errors.gpa && <p>{errors.gpa.message}</p>}

              <br />
              <Input
                type="text"
                name="course"
                placeholder="Course*"
                disabled={isBlocked}
                sx={inputStyle}
                {...register("course")}
              ></Input>{" "}
              {errors.course && <p>{errors.course.message}</p>}

              <br />
              <Button
                type="submit"
                disabled={ Object.keys(errors).length > 0  || isBlocked}

                style={{
                  background: "linear-gradient(45deg, #4A148C, #9C27B0)", // 💜 gradient
                  color: "#9527A9",
                  fontWeight: "bold",
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
              <PreviewCard content={"j"} />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default RegistrationForm;
