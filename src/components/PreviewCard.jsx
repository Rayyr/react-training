import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function PreviewCard({ content }) {
  return (
    <Box sx={{ minWidth: 275, width: 320 }}>
      <Card
        variant="outlined"
        sx={{
          border: "2px solid #4A148C",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 8px 20px rgba(74, 20, 140, 0.15)",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              color: "#4A148C",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "2px solid #BB86FC",
              paddingBottom: "8px",
              marginBottom: "14px",
            }}
          >
            Preview Card
          </Typography>

          <Typography variant="body2" sx={{ color: "#7B1FA2", fontSize: "16px", marginBottom: "8px" }}>
            Username: {content.username || "-"}
          </Typography>

          <Typography variant="body2" sx={{ color: "#7B1FA2", fontSize: "16px", marginBottom: "8px" }}>
            Email: {content.email || "-"}
          </Typography>

          <Typography variant="body2" sx={{ color: "#7B1FA2", fontSize: "16px", marginBottom: "8px" }}>
            GPA: {content.gpa || "-"}
          </Typography>

          <Typography variant="body2" sx={{ color: "#7B1FA2", fontSize: "16px" }}>
            Course: {content.course || "-"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}