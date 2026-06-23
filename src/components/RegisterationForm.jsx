import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "../styles/RegisterationForm.css";

//all input valiodation will be applied manually
function RegisterationForm() {
  //single state obj
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
  const [regStudents, setRegStudents] = useState([]);

  const handleSubmit = (e) => {
    //prevent page refresh
    e.preventDefault();

    //validation
    if (validateForm() === false) {
      reset();
      return;
    }

    //add them to regStudents
    setRegStudents([
      ...regStudents,
      { name: formData.username, email: formData.email, gpa: formData.gpa },
    ]);
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
      gpa: "",
    });
  }

  function validateForm() {
    if (validateUsername() === false) return false;
    if (validateEmail() === false) return false;
    if (validateGpa() === false) return false;
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
    <div className="main-cont">
      <div className="child1">
        <form id="stu-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => handleChange(e)}
            disabled={isBlocked}
          ></input>{" "}
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            disabled={isBlocked}
          ></input>{" "}
          <br />
          <input
            type="number"
            name="gpa"
            placeholder="GPA"
            value={formData.gpa}
            onChange={(e) => handleChange(e)}
            step="0.01"
            disabled={isBlocked}
          ></input>{" "}
          <br />
          <button
            type="submit"
            disabled={
              !formData.username ||
              !formData.email ||
              !formData.gpa ||
              isBlocked
            }
          >
            Register student
          </button>
        </form>
      </div>

      <div className="child2">
        <div className="preview-row">
          <div className="preview-card">
            <p>{formData.username}</p>
            <p>{formData.email}</p>
            <p>{formData.gpa === 0 ? "" : formData.gpa}</p>
          </div>
        </div>

        <div className="registered-students">
          {regStudents.map((e, ind) => (
            <div className="student-card" key={ind}>
              <p>{e.name}</p>
              <p>{e.email}</p>
              <p>{e.gpa}</p>
            </div>
          ))}
        </div>
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
  );
}

export default RegisterationForm;
