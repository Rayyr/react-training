import "./App.css";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import About from "./pages/About.jsx";
import RegistrationForm from "./pages/RegistrationForm.jsx";
import { useState } from "react";
import StudentDetails from "./pages/StudentDetails.jsx";
import NavBar from "./components/NavBar.jsx";
import Error from "./pages/Error.jsx";
import { StudentProvider } from "./context/StudentContext.js";
import { ToastContainer, Bounce } from "react-toastify";


function App() {
  //form blocking state when there is a toast notification , untill it is terminated
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <>
      <StudentProvider>
        <NavBar isBlocked={isBlocked}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsList isBlocked={isBlocked} setIsBlocked={setIsBlocked}/>} />
          <Route
            path="/register"
            element={
              <RegistrationForm
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
    </>
  );
}

export default App;
