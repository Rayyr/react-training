import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import About from "./pages/About.jsx";
import StuRegistrationForm from "./pages/StuRegistrationForm.jsx";
import AdminRegistrationForm from "./pages/AdminRegistrationForm.jsx";
import { useState } from "react";
import StudentDetails from "./pages/StudentDetails.jsx";
import NavBar from "./components/UserDefined UI/NavBar.jsx";
import NotFoundError from "./pages/404NotFound.jsx";
import { StudentProvider } from "./context/StudentContext.js";
import { AuthProvider } from "./context/AuthContext.js";
import { ToastContainer, Bounce } from "react-toastify";
import ErrorBoundary from "./components/UserDefined UI/ErrorBoundary.jsx";
/* eslint-disable no-unused-vars */
import { Bug } from "./components/UserDefined UI/Bug.jsx";
/* eslint-enable no-unused-vars */
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/UserDefined UI/ProtectedRoute.jsx";
import { roles } from "./constatnts/generalConstants.js";
import Wellcome from "./pages/Wellcome.jsx";
import GuestRoute from "./components/UserDefined UI/GuestRoute.jsx";

function App() {
  //form blocking state when there is a toast notification , untill it is terminated
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <>
      {/*i make first studentprovider then authprovider since authprovier internally contani student context */}
      <StudentProvider>
        <AuthProvider>
          <NavBar isBlocked={isBlocked} />
          <ErrorBoundary>
            {/*  <Bug></Bug>*/}
            {/*//just to test error boundry at root level , but actually i handle the expexted errors at lower levels of each component*/}
            <Routes>
              <Route
                path="/login"
                element={
                  <GuestRoute setIsBlocked={setIsBlocked}>
                    {" "}
                    <Login isBlocked={isBlocked} setIsBlocked={setIsBlocked} />
                  </GuestRoute>
                }
              />{" "}
              {/*accessable from anyone not logged in*/}
              <Route path="/home" element={ <GuestRoute setIsBlocked={setIsBlocked}><Home /></GuestRoute>} />{" "}
            {/*accessable from anyone not logged in*/}
              <Route path="/" element={<GuestRoute setIsBlocked={setIsBlocked}><Home /></GuestRoute>} />{" "}
              {/*accessable from anyone not logged in*/}

              <Route
                path="/wellcome"
                element={
                  <ProtectedRoute allowedRoles={[roles.student, roles.admin]}>
                    <Wellcome isBlocked={isBlocked} />
                  </ProtectedRoute>
                }
              />{" "}
              {/*accessable only for authorized users with these roles*/}
              <Route
                path="/students"
                element={
                  <ProtectedRoute allowedRoles={[roles.admin]}>
                    <StudentsList
                      isBlocked={isBlocked}
                      setIsBlocked={setIsBlocked}
                    />
                  </ProtectedRoute>
                }
              />
              {/*accessable only for authorized users with these roles*/}
              <Route
                path="/stu-register"
                element={
                  <StuRegistrationForm
                    isBlocked={isBlocked}
                    setIsBlocked={setIsBlocked}
                  />
                }
              />{" "}
              {/*===student sign up ,accessable from anyone(even if they are not authanticated)*/}

                            <Route
                path="/ad-register"
                element={
                  <AdminRegistrationForm
                    isBlocked={isBlocked}
                    setIsBlocked={setIsBlocked}
                  />
                }
              />{" "}
              {/*===admin sign up ,accessable from anyone(even if they are not authanticated)*/}

              <Route
                path="/students/:email"
                element={
                  <ProtectedRoute allowedRoles={[roles.admin]}>
                    <StudentDetails
                      isBlocked={isBlocked}
                      setIsBlocked={setIsBlocked}
                    />
                  </ProtectedRoute>
                }
              />
              {/*accessable only for authorized users with these roles*/}
              <Route path="/about" element={<About />} />{" "}
              {/*accessable from anyone(even if they are not authanticated)==for invalid routes*/}
              <Route path="*" element={<NotFoundError />} />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
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
