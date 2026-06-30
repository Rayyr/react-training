//all input valiodation will be applied manually

export default function validateForm(
  formData,
  students,
  toast,
  setIsBlocked,
  isUpdateOp = false,
) {
  console.log(formData);
  if (validateUsername(formData, toast, setIsBlocked) === false) return false;
  if (
    validateEmail(formData, toast, setIsBlocked, students, isUpdateOp) === false
  )
    return false;
  if (validateGpa(formData, toast, setIsBlocked) === false) return false;
  if (validateCourse(formData, toast, setIsBlocked) === false) return false;
  return true;
}

function validateCourse(formData, toast, setIsBlocked) {
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

function validateGpa(formData, toast, setIsBlocked) {
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

function validateEmail(formData, toast, setIsBlocked, students, isUpdateOp) {
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
  if (isUpdateOp === true) {
    if (
      students.find((e) => {
        return e.email === formData.email && e.id !== formData.id;
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
  } else if (
    //add operaion
    students.find((e) => {
      return e.email === formData.email;
    })
  ) {
    toast.error("Sorry,the email is assioated with other regeisterted user!", {
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

function validateUsername(formData, toast, setIsBlocked) {
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
