import { useState } from "react";

export default function useForm(
  initialFormValues,
  validateForm,
  onSubmit,
  isUpdateOp = false,
) {
  const [formData, setFormData] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    if (isUpdateOp === true)
      setFormData(formData); //in case of updateStudentDetails then it will reset to new values
    else setFormData(initialFormValues); //in case of register student then it will reset to empty values(initial ones="")
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(formData);
    if (!isValid) {
      reset();
      return; //the toast msg is being printed in validateForm fun
    }
    onSubmit(formData);
    reset();
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    reset,
    setFormData,
  };
}
