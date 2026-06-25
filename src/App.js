import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import About from "./pages/About.jsx";
import RegisterationForm from "./pages/RegisterationForm.jsx";
import { useState } from "react";
import StudentDetails from "./pages/StudentDetails.jsx";
import NavBar from "./components/NavBar.jsx";
import Error from "./pages/Error.jsx";
import { StudentProvider } from "./context/StudentContext.js";

function App() {
  //form blocking state when there is a toast notification , untill it is terminated
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <>
      <StudentProvider>
        <NavBar isBlocked={isBlocked}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsList />} />
          <Route
            path="/register"
            element={
              <RegisterationForm
                isBlocked={isBlocked}
                setIsBlocked={setIsBlocked}
              />
            }
          />
          <Route path="/students/:email" element={<StudentDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </StudentProvider>
    </>
  );
}

export default App;
