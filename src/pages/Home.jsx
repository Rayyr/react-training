import React from "react";
import { useNavigate } from "react-router-dom";
import { GooeyDemo } from "../components/BuiltIn UI/GooeyDemo";
import { Button } from "@mui/material";
import BubbleText from "../components/BuiltIn UI/BubbleText/BubbleText";

function Home() {
  const navigate = useNavigate();

  const buttonStyle = {
    whiteSpace: "nowrap",
    flex: "unset",
    padding: "8px 15px",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "25px",
    background: "linear-gradient(45deg, #4A148C, #9C27B0)",
    color: "#fff",

    "&:hover": {
      background: "linear-gradient(45deg, #6A1B9A, #BB86FC)",
    },

    "&.Mui-disabled": {
      background: "#2A1B3D",
      color: "#FFFFFF",
      pointerEvents: "auto",
      cursor: "not-allowed",
      opacity: 0.7,
    },
  };

  return (
    <>
      <GooeyDemo>
        {" "}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-100px",
          }}
        >
          
          <BubbleText color="#9C27B0" fontSize="100px">Home</BubbleText>
           <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              marginTop: "100px",
            }}
          >
            <Button
              sx={{ ...buttonStyle, width: "150px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              sx={{ ...buttonStyle, width: "230px" }}
              onClick={() => navigate("/stu-register")}
            >
              Student Register
            </Button>

               <Button
              sx={{ ...buttonStyle, width: "230px" }}
              onClick={() => navigate("/ad-register")}
            >
              Admin Register
            </Button>
          </div>
        </div>
      </GooeyDemo>
    </>
  );
}

export default Home;
