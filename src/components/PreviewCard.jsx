import { Card, CardContent, Typography } from "@mui/material";

function PreviewCard({ content }) {
  return (
    <Card
      sx={{
        backgroundColor: "#4A148C",   // dark purple background
        color: "#E0D7FF",             // light purple text
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        minWidth: 250,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardContent>
        <Typography   sx={{  mb: 1 }}>
          Username: {content.username}
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Email: {content.email }
        </Typography>

        <Typography sx={{ mb: 1 }}>
          GPA: {content.gpa === 0 ? "" :  content.gpa}
        </Typography>

        <Typography>
          Course: {content.course }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PreviewCard;