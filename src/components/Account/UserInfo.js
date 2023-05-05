"use client";
import React from "react";
import Typography from "@mui/material/Typography";

const UserInfo = (props) => {
  const { user } = props;
  console.log("userinfo-user--->", user);
  return (
    <div>
      <Typography variant="h6" align="left" color="text.secondary" paragraph>
        Bienvenido,{" "}
        {user.name && user.lastname
          ? `${user.name} ${user.lastname} `
          : user.email}{" "}
      </Typography>
    </div>
  );
};

export default UserInfo;
