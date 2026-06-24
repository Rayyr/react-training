import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

function MyModal({ open, onClose, content }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: 350,
          bgcolor: "#4A148C",
          border: "2px solid #4A148C",
          borderRadius: "12px",
          boxShadow: "0 0 20px #BB86FC",
          p: 3,
          color: "#F3E5F5",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {content?.username}
        </Typography>

        <Typography>Email: {content?.email}</Typography>
        <Typography>Course: {content?.course}</Typography>
        <Typography>GPA: {content?.gpa}</Typography>

        <Button
          onClick={onClose}
          sx={{
            mt: 2,
            background: "linear-gradient(45deg, #4A148C, #9C27B0)",
            color: "#fff",
            textTransform: "none",

            "&:hover": {
              background: "linear-gradient(45deg, #6A1B9A, #BB86FC)",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default MyModal;