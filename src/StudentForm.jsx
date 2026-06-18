import { useState } from "react";

function StudentForm() {
  const [formData,setFormData]=useState({

    name:"",
    email:"",
    gender:"",
    course:"",
    gpa:"",
  });

    const [students, setStudents] = useState([]);


  const handleSubmit=(e)=>{
    e.preventDefault();
    //general not-null values validation
        if (!formData.name || !formData.email || !formData.course || !formData.gpa) {
      alert("Name and Email and Course and GPA are required!");
      return;
    }

    //gpa validation
    if(formData.gpa<0 || formData.gpa>4) {
         alert("GPA must be greater than zero and less than 4.00!");
      return;
    }
        setStudents([...students, formData]);


        setFormData({
      name: "",
      email: "",
      gender: "",
      course: "",
      gpa:""
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

 <input
          type="number"
          name="gpa"
          placeholder="GPA"
          value={formData.gpa}
          onChange={handleChange}
          required
          step="0.01"
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
          <p>{s.name} | {s.email} | {s.gender} | {s.course} | {s.gpa}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentForm;