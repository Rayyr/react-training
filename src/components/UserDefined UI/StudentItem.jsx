import React, { useState } from "react";
import MyModal from "./Modal.jsx";
import { Card, CardContent, Typography, Button } from "@mui/material";
import UpdateForm from "./UpdateForm.jsx";

function StudentItem({ isBlocked,onlyDetails, onDeleteStudent, content }) {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const buttonStyle = {
    whiteSpace: "nowrap",
    flex: "unset",
    padding: "8px 15px",
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
  };
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
          maxWidth: onlyDetails ? "420px" : "320px",
          padding: onlyDetails ? "24px" : "15px",
          margin: onlyDetails ? "40px auto" : "5px 30px",

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
                gap: "12px",
                marginTop: "12px",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                disabled={isBlocked}
                onClick={() => setShowUpdateModal(true)}
                sx={{ ...buttonStyle, flex: 1 }}
              >
                Update
              </Button>

              <Button
              disabled={isBlocked}
                onClick={() => setShowModal(true)}
                sx={{ ...buttonStyle, flex: 1 }}
              >
                View Details
              </Button>

              <Button
              disabled={isBlocked}
                onClick={()=>onDeleteStudent(content)}
                sx={{ ...buttonStyle, flex: 1 }}
              >
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {onlyDetails === true
        ? null
        : showModal && (
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
