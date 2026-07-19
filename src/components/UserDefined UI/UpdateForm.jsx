import { Input, Modal, Button, Box, Typography } from "@mui/material";
import { StudentContext } from "../../context/StudentContext.js";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";

export default function UpdateForm({ open, onClose, content }) {
  const { students, updateStudentDetails } = useContext(StudentContext);

  const [isBlocked, setIsBlocked] = useState(false);

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

  //errors:form validation ones
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: content.username,
      email: content.email, //unique
      course: content.course,
      gpa: content.gpa,
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const buttonStyle = {
    whiteSpace: "nowrap",
    flex: "unset",
    padding: "8px 15px",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "13px",
    background: "linear-gradient(45deg, #4A148C, #9C27B0)",
    color: "#fff",

    "&:hover": {
      background: "linear-gradient(45deg, #6A1B9A, #BB86FC)",
    },

    "&.Mui-disabled": {
      background: "#2A1B3D",
      color: "#FFFFFF",
      pointerEvents: "auto",
      cursor: "not-allowed",
      opacity: 0.7,
    },
  };

  const makeSubmission = (data) => {
    //we need to check email uniqness aming other students  : server side validation(DB level)

    const otherStudent = students.find(
      (st) => st.email === data.email && st.email !== content.email,
    );
    if (otherStudent) {
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
      reset();
    } else {
      updateStudentDetails(content.email, data)
        .then(() => {
          toast.success("Student details has been updated successfully!", {
            style: {
              width: "500px",
            },
            onOpen: () => setIsBlocked(true),
            onClose: () => setIsBlocked(false),
          });

          reset(data);
        })
        .catch((err) => {
          toast.error(err || "Failed to update student details", {
            //err:in case of DB itself failre (connection ..) , err.post in case of specefically in POST op
            style: {
              width: "500px",
            },
            onOpen: () => setIsBlocked(true),
            onClose: () => setIsBlocked(false),
          });
        });
    }
    clearErrors();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!isBlocked) onClose();
      }}
      disableEscapeKeyDown={isBlocked}
    >
      <form noValidate onSubmit={handleSubmit(makeSubmission)}>
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
            type="text"
            name="username"
            placeholder="Username"
            disabled={isBlocked}
            autoFocus={true}
            sx={{ mb: 2 }}
            {...register("username")}
          />
          {errors.username && (
            <ErrorMessage
              name="username"
              errors={errors}
              render={({ message }) => <p className="error">{message}</p>}
            />
          )}
          <Input
            fullWidth
            type="email"
            name="email"
            placeholder="Email"
            disabled={isBlocked}
            sx={{ mb: 2 }}
            {...register("email")}
          />
          {errors.email && (
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className="error">{message}</p>}
            />
          )}
          <Input
            fullWidth
            type="text"
            name="course"
            placeholder="Course"
            disabled={isBlocked}
            sx={{ mb: 2 }}
            {...register("course")}
          />
          {errors.course && (
            <ErrorMessage
              name="course"
              errors={errors}
              render={({ message }) => <p className="error">{message}</p>}
            />
          )}
          <Input
            fullWidth
            type="number"
            name="gpa"
            placeholder="GPA"
            disabled={isBlocked}
            step="0.01"
            sx={{ mb: 2 }}
            {...register("gpa")}
          />
          {errors.gpa && (
            <ErrorMessage
              name="gpa"
              errors={errors}
              render={({ message }) => <p className="error">{message}</p>}
            />
          )}

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button
              onClick={() => {
                if (!isBlocked) onClose();
              }}
              variant="contained"
              color="primary"
              disabled={isBlocked}
              sx={buttonStyle}
            >
              Close
            </Button>

            <Button
              disabled={isBlocked || !isValid}
              type="submit"
              variant="contained"
              color="primary"
              sx={buttonStyle}
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
