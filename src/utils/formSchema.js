
import * as yup from "yup";
  //blueprint for inputs validation via yup library : client side validation : no dependency on browser-level validation(tags themselves)

  export const formSchema = yup.object({
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
 
  // Schema for admin registration (only username and email)
  export const adminFormSchema = yup.object({
    username: yup
      .string()
      .required("Username is required!")
      .matches(/^[a-zA-Z0-9]+$/, "only letters , numbers are allowed!"),

    email: yup
      .string()
      .required("Email is required!")
      .matches(/@gmail\.com$/, "Email must end with @gmail.com")
      .test(
        "first letter of email",
        "Email must not start by digit or special char!",
        (email) => (email ? /^[a-zA-Z]/.test(email) : true),
      )
      .test(
        "Not as same as username",
        "Email name must not equal username",
        function (email) {
          const { username } = this.parent;

          if (!email) return true;

          const namePart = email.split("@")[0];
          return namePart !== username;
        },
      ),
  });