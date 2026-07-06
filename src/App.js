import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import About from "./pages/About.jsx";
import RegistrationForm from "./pages/RegistrationForm.jsx";
import { useState } from "react";
import StudentDetails from "./pages/StudentDetails.jsx";
import NavBar from "./components/UserDefined UI/NavBar.jsx";
import NotFoundError from "./pages/404NotFound.jsx";
import { StudentProvider } from "./context/StudentContext.js";
import { ToastContainer, Bounce } from "react-toastify";
import ErrorBoundary from "./components/UserDefined UI/ErrorBoundary.jsx";
import { Bug } from "./components/UserDefined UI/Bug.jsx";
import Login2 from "./pages/Login2";
 

function App() {
  //form blocking state when there is a toast notification , untill it is terminated
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <>
      
        <StudentProvider>
          <NavBar isBlocked={isBlocked} />
          <ErrorBoundary>
            {/*  <Bug></Bug>*/}{" "}
            {/*//just to test error boundry at root level , but actually i handle the expexted errors at lower levels of each component*/}
            <Routes>
        

              <Route path="/login" element={<Login2 />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/students"
                element={
                  <StudentsList
                    isBlocked={isBlocked}
                    setIsBlocked={setIsBlocked}
                  />
                }
              />
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
              <Route path="*" element={<NotFoundError />} />
            </Routes>
          </ErrorBoundary>
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
