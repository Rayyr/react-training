import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "../styles/RegisterationForm.css";
import StudentList from "./StudentList";
import { Input,Button,Box } from "@mui/material";
  
//all input valiodation will be applied manually
function RegisterationForm() {
  //single state obj
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    course: "",
    gpa: "",
  });

  //form clocking state
  const [isBlocked, setIsBlocked] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.placeholder.toLowerCase(); //to match the formData pbj attribute or directlly use name attribute
    setFormData({ ...formData, [name]: value });
  };

  //registered successfullr students array
  //s1:{name: email: gpa:}
  //s2:...
  const [regStudents, setRegStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const handleSubmit = (e) => {
    //prevent page refresh
    e.preventDefault();

    //validation
    if (validateForm() === false) {
      reset();
      return;
    }

    //add them to regStudents
    const newRegStudents = [
      ...regStudents,
      {
        //new student obj
        name: formData.username,
        email: formData.email,
        course: formData.course,
        gpa: formData.gpa,
      },
    ];
    setRegStudents(newRegStudents);
    localStorage.setItem("students", JSON.stringify(newRegStudents));
    toast.success("New student has been registered succesfully!", {
      style: {
        width: "500px",
      },
      onOpen: () => setIsBlocked(true),
      onClose: () => setIsBlocked(false),
    });
    reset();
    //
  };

  function reset() {
    setFormData({
      email: "",
      username: "",
      course: "",
      gpa: "",
    });
  }

  function validateForm() {
    if (validateUsername() === false) return false;
    if (validateEmail() === false) return false;
    if (validateGpa() === false) return false;
    if (validateCourse() === false) return false;
    return true;
  }

  function validateCourse() {
    if (/[^a-zA-Z]/.test(formData.course) === true) {
      toast.error("Sorry,the course must not contain any special characters!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }
    return true;
  }

  function validateGpa() {
    //check min
    if (formData.gpa <= 0) {
      toast.error("Sorry,the GPA must be strictlly greater than 0!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //check max
    if (formData.gpa > 4) {
      toast.error("Sorry,the GPA must be smaller or equel 4!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    return true;
  }

  function validateEmail() {
    //example@gmail.com
    //check requirness
    if (formData.email.length === 0) {
      toast.error("Sorry,the email is required!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //check if example != username
    //0 based index
    let atIndex = formData.email.indexOf("@");

    if (formData.email.substring(0, atIndex) === formData.username) {
      toast.error("Sorry,the email must not include your username", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //check if first char must is a digit or special char
    if (/[^a-zA-Z]/.test(formData.email.at(0)) === true) {
      toast.error("Sorry,the email must not start by digit or special char!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //check email uniqness
    if (
      regStudents.find((e) => {
        return e.email === formData.email;
      })
    ) {
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
      return false;
    }
    return true;
  }

  function validateUsername() {
    //check requirness
    if (formData.username.length === 0) {
      toast.error("Sorry,the username is required!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //check if have spaces
    if (/\s/.test(formData.username) === true) {
      toast.error("Sorry,the username must not have spaces!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //check if have special chars
    const specialCharsRegex = /[^a-zA-Z0-9]/;
    if (specialCharsRegex.test(formData.username) === true) {
      toast.error("Sorry,the username must not have special chars!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });
      return false;
    }

    //valid username
    return true;
  }

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
    color: "#F3E5F5",

    "&:hover": {
      background: "linear-gradient(45deg, #6A1B9A, #BB86FC)",
    },

    "&:active": {
      transform: "scale(0.98)",
    },

    "&.Mui-disabled": {
       background: "#2A1B3D",
      color: "#FFFFFF",              // ✅ white text
      opacity: 0.7,    
        pointerEvents: "auto",   
     cursor: "not-allowed",
    },
  }}
            >
              Register student
            </Button>
          </form>
        </div>

        <div className="child2">
          <div className="preview-row">
            <div className="preview-card">
              <p>{formData.username}</p>
              <p>{formData.email}</p>
              <p>{formData.gpa === 0 ? "" : formData.gpa}</p>
              <p>{formData.course}</p>
            </div>
          </div>

          <StudentList isBlocked={isBlocked} list={regStudents} />
        </div>

        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </Box>
  );
}

export default RegisterationForm;
