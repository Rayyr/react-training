import React, { useContext } from "react";
import { toast } from "react-toastify";
import "../styles/RegisterationForm.css";
import { Input, Box } from "@mui/material";
import PreviewCard from "../components/UserDefined UI/PreviewCard.jsx";
import {AdminContext } from "../context/AdminContext.js";
import Button from "../components/BuiltIn UI/Button.jsx";
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText.jsx";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminFormSchema as formSchema } from "../utils/formSchema.js";
import { useNavigate } from "react-router-dom";
import GravityStarsBackground from "../components/BuiltIn UI/Animated Background/GravityStarsBackground.jsx";
import "../styles/gravityStartsBackground.css";
import { StudentContext } from "../context/StudentContext.js";

function AdminRegistrationForm({ isBlocked, setIsBlocked }) {
  const navigate = useNavigate();

  const { admins, addAdmin, errors: adminErrors } = useContext(AdminContext);

    const { students } = useContext(StudentContext);


  const formData = {
    username: "",
    email: "",
    
  };

  const {
    register,
    handleSubmit,
    
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

  const makeSubmission = async (data) => {
    // client-side unique email check
    setIsBlocked(true);
    try {
      const admin = admins.find((ad) => ad.email === data.email);
       const stu = students.find((st) => st.email === data.email);
      if (admin || stu) {
        toast.error("Sorry, the email is associated with another registered user!", {
          style: { width: "500px" },
          onOpen: () => setIsBlocked(true),
          onClose: () => setIsBlocked(false),
        });
        return;
      }

      const created = await addAdmin(data);
      toast.success("New admin has been registered successfully!", {
        style: { width: "500px" },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });

      reset();
      return created;
    } catch (err) {
      const message = err?.message || adminErrors?.POST || "Failed to register admin";
      toast.error(message, {
        style: { width: "500px" },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      throw err;
    } finally {
      clearErrors();
      setIsBlocked(false);
    }
  };

  return (
    <>
      <GravityStarsBackground>
        <BubbleText color="#9C27B0" fontSize="70px">
          Admin Registeration Form
        </BubbleText>
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
                style={{ width: "100%", margin: "0 auto" }}
              >
                <Input
                  type="text"
                  
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

export default AdminRegistrationForm;
