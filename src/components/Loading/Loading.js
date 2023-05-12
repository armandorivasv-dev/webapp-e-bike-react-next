import React from "react";
import { Typography } from "@mui/material";

const Loading = (props) => {
  const { text } = props;
  return (
    <Typography variant="h7" align="center" color="text.secondary" paragraph>
      {text}
    </Typography>
  );
};

export default Loading;
