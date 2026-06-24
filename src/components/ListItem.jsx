import React, { useState } from "react";
import MyModal from "./Modal.jsx";
import { Card, CardContent, Typography, Button } from "@mui/material";

function ListItem({ onDeleteStudent,content, isBlocked }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#4A148C",
          border: "2px solid #4A148C",
          borderRadius: "12px",
          color: "#E1BEE7",
          transition: "0.3s",

          minWidth: "260px",
          maxWidth: "260px",

          "&:hover": {
            transform: "translateY(-5px)",
            borderColor: "#BB86FC",
            boxShadow: "0 0 15px #BB86FC",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: "#F3E5F5" }}>
            {content.name}
          </Typography>

          <Typography variant="body2">{content.email}</Typography>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => setShowModal(true)}
              disabled={isBlocked}
              sx={{
                whiteSpace: "nowrap",
                flex: 1,
                padding: "8px 10px",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "13px",
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
              }}
            >
              View Details
            </Button>

            <Button
            onClick={onDeleteStudent}
              disabled={isBlocked}
              sx={{
                whiteSpace: "nowrap",
                flex: 1,
                padding: "8px 10px",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "13px",
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
              }}
            >
              Delete Student
            </Button>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <MyModal
          open={showModal}
          content={content}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default ListItem;
