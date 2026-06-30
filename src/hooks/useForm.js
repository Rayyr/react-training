import { useState } from "react";

export default function useForm(initialFormValues, validateForm, onSubmit) {
  const [formData, setFormData] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setFormData(initialFormValues);
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
