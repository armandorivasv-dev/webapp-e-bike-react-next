import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import ResponsiveDrawer from "@/components/Menu/ResponsiveDrawer";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 240,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      {/* <ResponsiveDrawer /> */}
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
