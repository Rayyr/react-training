import React, { useContext } from "react";
import { toast } from "react-toastify";
import "../styles/RegisterationForm.css";
import { Input, Box } from "@mui/material";
import PreviewCard from "../components/UserDefined UI/PreviewCard.jsx";
import { StudentContext } from "../context/StudentContext.js";
import Button from "../components/BuiltIn UI/Button.jsx";
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText.jsx";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
 import GravityStarsBackground from "../components/BuiltIn UI/Animated Backgrounds/GravityStarsBackground.jsx";

 function RegistrationForm({ isBlocked, setIsBlocked }) {
  const navigate = useNavigate();

 
  const { students, addStudent } = useContext(StudentContext);

  const formData = {
    username: "",
    email: "",
    course: "",
    gpa: "",
  };

  //blueprint for inputs validation via yup library : client side validation : no dependency on browser-level validation(tags themselves)
  const formSchema = yup.object({
    username: yup
      .string()
      .required("Username is required!")
      .matches(/^[a-zA-Z0-9]+$/, "only letters , numbers are allowed!"),

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
      ),
    gpa: yup
      .number()
      .min(0, "GPA must be >= 0!")
      .max(4, "GPA must be <= 4!")
      .test(
        "decimal-precision",
        "GPA must have max 2 decimal places",
        (value) =>
          value === undefined || /^(\d+(\.\d{1,2})?)$/.test(value.toString()),
      )
      .required("GPA is required!"), //handles not nullable

    course: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Course must not contain any special characters!",
      )
      .required("Course is required!"),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

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

  const makeSubmission = (data) => {
    //once reached here so of course the inouts are being validated succesfully so the issues that may appear will be from DB not inouts themselves ( logically)

    // unique email const : server side validation(DB level)
    const student = students.find((st) => st.email === data.email);
    if (student) {
      toast.error(
        "Sorry,the email is assioated with other regeisterted user!",
        {
          style: {
            width: "500px",
          },
          onOpen: () => setIsBlocked(true),
          onClose: () => setIsBlocked(false),
        },
      );
    } else {
      addStudent(data)
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
          toast.error(err.message || err.POST, {
            //err:in case of DB itself failre (connection ..) , err.post in case of specefically in POST op
            style: {
              width: "500px",
            },
            onOpen: () => setIsBlocked(true),
            onClose: () => setIsBlocked(false),
          });
        });

      reset();
    }
    clearErrors();
  };

  return (
    <>
      <GravityStarsBackground>
        <BubbleText color="#9C27B0" fontSize="70px">Student Registeration Form</BubbleText>
        <Box
          sx={{
            backgroundColor: "transparent",
            minHeight: "100vh",
            padding: 3,
          }}
        >
          <div className="main-cont">
            <div className="child1">
              <form
                noValidate
                id="stu-form"
                onSubmit={handleSubmit(makeSubmission)}
                   style={{ width: "100%" , margin: "0 auto" }}
              >
                <Input
                  type="text"
                  name="username"
                  placeholder="Username*"
                  disabled={isBlocked}
                  autoFocus={true}
                  sx={inputStyle}
                  {...register("username")}
                ></Input>{" "}
                {errors.username && (
                  <ErrorMessage
                    name="username"
                    errors={errors}
                    render={({ message }) => <p className="error">{message}</p>}
                  />
                )}
                <br />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  disabled={isBlocked}
                  sx={inputStyle}
                  {...register("email")}
                ></Input>{" "}
                {errors.email && (
                  <ErrorMessage
                    name="email"
                    errors={errors}
                    render={({ message }) => <p className="error">{message}</p>}
                  />
                )}
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
                {errors.gpa && (
                  <ErrorMessage
                    name="gpa"
                    errors={errors}
                    render={({ message }) => <p className="error">{message}</p>}
                  />
                )}
                <br />
                <Input
                  type="text"
                  name="course"
                  placeholder="Course*"
                  disabled={isBlocked}
                  sx={inputStyle}
                  {...register("course")}
                ></Input>{" "}
                {errors.course && (
                  <ErrorMessage
                    name="course"
                    errors={errors}
                    render={({ message }) => <p className="error">{message}</p>}
                  />
                )}{" "}
                <br />
                <Button
                  type="submit"
                  disabled={isBlocked || !isValid}
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
                <PreviewCard content={watch()} />
              </div>
            </div>

            <button disabled={isBlocked} onClick={() => navigate("/home")}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="#9C27B0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group cursor-pointer transition-colors duration-200 hover:fill-[#9C27B0]"
                >
                  {/* Main House Outline */}
                  <path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />

                  {/* Inner Door (flips stroke color on hover so it stays visible) */}
                  <path
                    className="transition-colors duration-200 group-hover:stroke-white"
                    d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9z"
                  />
                </svg>{" "}
              </div>
            </button>
          </div>
        </Box>
      </GravityStarsBackground>
    </>
  );
}

export default RegistrationForm;
