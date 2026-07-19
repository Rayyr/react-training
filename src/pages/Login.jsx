import { AuthContext } from "../context/AuthContext.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roles } from "../constatnts/generalConstants.js";
import GravityStarsBackground from "../components/BuiltIn UI/Animated Background/GravityStarsBackground.jsx";
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText.jsx";
import { Input, Box } from "@mui/material";
import Button from "../components/BuiltIn UI/Button.jsx";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import "../styles/gravityStartsBackground.css";
import { toast } from "react-toastify";

function Login({ isBlocked, setIsBlocked }) {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [role, setRole] = useState("student"); //default

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, role } = e.target;
    // console.log(user);
    const isValid = await login(username.value, email.value, role.value);
    if (isValid)
      navigate("/wellcome"); //send authonticated users to Wellcome Page
    else {
      toast.error("Invalid credentials!", {
        style: {
          width: "500px",
        },
        onOpen: () => setIsBlocked(true),
        onClose: () => setIsBlocked(false),
      });

    }
    e.target.email.value="";
    e.target.username.value="";
    //navigate("/invalidRoute"); //send unauthonticated (different roles) to Error Page
  };

  const inputStyle = {
    color: "#7B1FA2", // 🔥 darker purple (typed text)
    fontSize: "22px",
    padding: "16px 0",
    width: "100%",

    "&::placeholder": {
      color: "#B39DDB", // keep placeholder lighter
      opacity: 0.7,
    },

    "&:before": {
      borderBottom: "2px solid #4A148C",
    },

    "&:after": {
      borderBottom: "3px solid #4A148C",
    },
  };

  return (
    <>
      <GravityStarsBackground overflow="hidden">
        <div style={{ marginTop: "100px" }}>
          <BubbleText color="#9C27B0" fontSize="70px">
            Login
          </BubbleText>
          <Box
            sx={{
              backgroundColor: "transparent",
              minHeight: "100vh",
              padding: 3,
            }}
          >
            <div className="main-cont">
              <div className="child1">
                <form
                  onSubmit={handleSubmit}
                  style={{ width: "100%", margin: "0 auto" }}
                >
                  <Input
                    sx={inputStyle}
                    name="username"
                    disabled={isBlocked}
                    type="text"
                    placeholder="Username"
                  />
                  <Input
                    sx={inputStyle}
                    name="email"
                    disabled={isBlocked}
                    type="email"
                    placeholder="Email"
                  />

                  <RadioGroup
                    row
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{
                      justifyContent: "center",
                      gap: 2,
                      marginTop: "50px",
                    }}
                  >
                    <FormControlLabel
                      value={roles.student}
                      disabled={isBlocked}
                      control={
                        <Radio
                          sx={{
                            color: "#9C27B0",
                            "&.Mui-checked": {
                              color: "#9C27B0",
                            },
                          }}
                          name="role"
                          id="student"
                        />
                      }
                      label="Student"
                      sx={{
                        color: role === roles.student ? "#9C27B0" : "#E1BEE7",
                      }}
                    />

                    <FormControlLabel
                      value={roles.admin}
                      disabled={isBlocked}
                      control={
                        <Radio
                          sx={{
                            color: "#9C27B0",
                            "&.Mui-checked": {
                              color: "#9C27B0",
                            },
                          }}
                          name="role"
                          id="admin"
                        />
                      }
                      label="Admin"
                      sx={{
                        color: role === roles.admin ? "#9C27B0" : "#E1BEE7",
                      }}
                    />
                  </RadioGroup>

                  <Button
                    style={{
                      background: "linear-gradient(45deg, #4A148C, #9C27B0)", // 💜 gradient
                      color: "#9527A9",
                      fontWeight: "bold",
                      marginTop: "100px",
                    }}
                    type="submit"
                    disabled={isBlocked}
                  >
                    Login
                  </Button>
                </form>
              </div>

              <div className="child2">
                <button onClick={() => navigate("/home")}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      fill="none"
                      stroke="#9C27B0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group cursor-pointer transition-colors duration-200 hover:fill-[#9C27B0]"
                    >
                      {/* Main House Outline */}
                      <path d="M21 19v-6.733a4 4 0 0 0-1.245-2.9L13.378 3.31a2 2 0 0 0-2.755 0L4.245 9.367A4 4 0 0 0 3 12.267V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />

                      {/* Inner Door (flips stroke color on hover so it stays visible) */}
                      <path
                        className="transition-colors duration-200 group-hover:stroke-white"
                        d="M9 15a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6H9z"
                      />
                    </svg>{" "}
                  </div>
                </button>
              </div>
            </div>
          </Box>
        </div>
      </GravityStarsBackground>
    </>
  );
}

export default Login;
