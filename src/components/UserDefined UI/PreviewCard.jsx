import {  CardContent, Typography } from "@mui/material";
import GlowingCard from "../BuiltIn UI/GlowingCard";

function PreviewCard({ content }) {
  return (
    <GlowingCard
      title="Preview Card"
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
    </GlowingCard>
  );
}

export default PreviewCard;