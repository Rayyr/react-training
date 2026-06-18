import { useState } from "react";

function StudentForm() {
  const [formData,setFormData]=useState({

    name:"",
    email:"",
    gender:"",
    course:""
  });

    const [students, setStudents] = useState([]);


  const handleSubmit=(e)=>{
    e.preventDefault();
        if (!formData.name || !formData.email || !formData.course) {
      alert("Name and Email and Course are required!");
      return;
    }
        setStudents([...students, formData]);


        setFormData({
      name: "",
      email: "",
      gender: "",
      course: "",
    });
  }


   const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <br /><br />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Register</button>
      </form>

      <hr />

      <h3>Students</h3>
      {students.map((s, i) => (
        <div key={i}>
          <p>{s.name} | {s.email} | {s.gender} | {s.course}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentForm;