import React, { useState } from "react";
import MyModal from "./Modal.jsx";
import { Card, CardContent, Typography, Button } from "@mui/material";
import UpdateForm from "./UpdateForm.jsx";

function StudentItem({ onlyDetails, onDeleteStudent, content }) {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  //onlyDetails=in case we are in studentDetails page there must not have a btns (view,delete)
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#4A148C",
          border: "2px solid #4A148C",
          borderRadius: "16px",
          color: "#E1BEE7",
          transition: "0.3s",

          width: "100%",
          maxWidth: onlyDetails ? "420px" : "260px",

          padding: onlyDetails ? "24px" : "16px",
          margin: onlyDetails ? "40px auto" : "0",

          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",

          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: "#BB86FC",
            boxShadow: "0 0 20px #BB86FC",
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ color: "#F3E5F5" }}>
            {content.username}
          </Typography>

          <Typography variant="body2">{content.email}</Typography>
          {onlyDetails === true ? (
            <Typography variant="body2">{content.gpa}</Typography>
          ) : null}
          {onlyDetails === true ? (
            <Typography variant="body2">{content.course}</Typography>
          ) : null}

          {onlyDetails === true ? null : (
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
                onClick={() => setShowUpdateModal(true)}
                sx={{
                  whiteSpace: "wrap",
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
                Update
              </Button>



              <Button
                onClick={() => setShowModal(true)}
                 
                sx={{
                  whiteSpace: "wrap",
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
                
                sx={{
                  whiteSpace: "wrap",
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
          )}
        </CardContent>
      </Card>

      {onlyDetails === true ? null : showModal && (
        <MyModal
          open={showModal}
          content={content}
          onClose={() => setShowModal(false)}
        />
      )}

      {showUpdateModal && (
        <UpdateForm
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          content={content}
        />
      )}
    </>
  );
}

export default StudentItem;
