import React from "react";
import { Button, Box, Typography } from "@mui/material";

function FilterBar({filters,setFilters}) {
  const buttonStyle = {
    flex: 1,
    
    padding: "10px 12px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,

    background: "linear-gradient(45deg, #4A148C, #9C27B0)",
    color: "#fff",

    transition: "0.3s",

    "&:hover": {
      background: "linear-gradient(45deg, #6A1B9A, #BB86FC)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(187, 134, 252, 0.4)",
    },

    "&.Mui-disabled": {
      background: "#2A1B3D",
      color: "#FFFFFF",
      cursor: "not-allowed",
      opacity: 0.7,
    },
  };

  return (
    <Box
      sx={{
         padding: "16px",
        borderRadius: "16px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
       }}
    >
      {/* Title */}
      <Typography
        sx={{
          color: "#D1C4E9",
          fontSize: "14px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Filters
      </Typography>

      {/* Buttons Row */}
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <Button sx={buttonStyle}>Name</Button>
        <Button sx={buttonStyle}>GPA</Button>
        <Button sx={buttonStyle}>Course</Button>
      </Box>
    </Box>
  );
}

export default FilterBar;