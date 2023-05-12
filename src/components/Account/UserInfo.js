import React from "react";
import Typography from "@mui/material/Typography";

const UserInfo = (props) => {
  const { user } = props;

  return (
    <div>
      <Typography
        variant="h6"
        align="left"
        color="#ffffff"
        noWrap
        component="div"
        ml={2}
      >
        Bienvenido,{" "}
        {user.name && user.lastname
          ? `${user.name} ${user.lastname} `
          : user.email}{" "}
      </Typography>
    </div>
  );
};

export default UserInfo;
