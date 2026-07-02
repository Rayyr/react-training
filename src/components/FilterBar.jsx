import React, { useState } from "react";
import { Button, Box, Typography, TextField, MenuItem } from "@mui/material";

function FilterBar({ filters, setFilters }) {
  const [activeFilter, setActiveFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleFiltering = () => {
    if (activeFilter === "username")
      setFilters({ ...filters, username: filterValue }); //update the parent filter
    else if (activeFilter === "gpa")
      setFilters({ ...filters, gpa: filterValue });
    else if (activeFilter === "course")
      setFilters({ ...filters, course: filterValue });

    setFilterValue("");
    setActiveFilter("");
  };

  const handleClear=()=>{
    setActiveFilter("");
     setFilterValue("");
     setFilters({username:"",gpa:"",course:""});
  };

  const buttonStyle = {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
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

  const inputStyle = {
    input: {
      color: "#D1C4E9",
      caretColor: "#E1BEE7",
    },

    // 🔥 label styles
    "& .MuiInputLabel-root": {
      color: "#B39DDB",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#E1BEE7", // 👈 remove blue here
    },

    // 🔥 outline styles
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7E57C2",
      },
      "&:hover fieldset": {
        borderColor: "#B39DDB",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#E1BEE7",  
      },
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
      <Typography
        sx={{
          color: "#7B1FA2",
          fontSize: "14px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Filters
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        <Button
          
          sx={buttonStyle}
          onClick={() => setActiveFilter("username")}
        >
          Username
        </Button>

        <Button
          
          sx={buttonStyle}
          onClick={() => setActiveFilter("gpa")}
        >
          GPA
        </Button>

        <Button
         
          sx={buttonStyle}
          onClick={() => setActiveFilter("course")}
        >
          Course
        </Button>
      </Box>

      <Box sx={{ marginTop: "16px" }}>
        {activeFilter === "username" && (
          <TextField
            label="Search by username"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            fullWidth
            sx={inputStyle}
          />
        )}

        {activeFilter === "gpa" && (
          <TextField
            label="Search by GPA"
            type="number"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            fullWidth
            sx={inputStyle}
          />
        )}

        {activeFilter === "course" && (
          <TextField
            select
            label="Select course"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            fullWidth
            sx={inputStyle}
          >
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="HTML">HTML</MenuItem>
            <MenuItem value="CSS">CSS</MenuItem>
          </TextField>
        )}
      </Box>

      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  }}
>


      <Button 
        disabled={  activeFilter === "" || filterValue === ""}
         sx={{...buttonStyle,flex:0,marginTop:"10px"}}
        onClick={handleFiltering}
      >
        Filter
      </Button>

        <Button 
          sx={{...buttonStyle,flex:0,marginTop:"10px"}}
        onClick={handleClear}
      >
        Clear
      </Button>
      </Box>
    </Box>
  );
}

export default React.memo(FilterBar);
