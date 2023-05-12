import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import useAuth from "@/hooks/useAuth";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CART, SEARCH_HISTORY } from "@/utils/constants";
import { getUserApi } from "@/services/api/auth";
import UserInfo from "../Account/UserInfo";
import { ResponsiveDrawerOptins } from "./ResponsiveDrawerOptions";

const colorAppBar = grey[500];

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, badgeData } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { logout, auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getUserApi(auth.token);
      setUser(response);
    })();
  }, []);

  //dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    localStorage.clear(CART);
    localStorage.clear(SEARCH_HISTORY);
    logout();
  };
  //dialog

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // color="bgDark"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "#212121",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          TIENDA ESPECIALIZADA EN MOUNTAINBIKE
          {/* {!user ? <h6>Cargando...</h6> : <UserInfo user={user} />} */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ height: 5 }}
          >
            <Image width="60" height="60" alt="Images" src={logo} />
          </Grid>
          <ResponsiveDrawerOptins />
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ height: 5 }}
          >
            <Image width="70" height="70" alt="Images" src={logo} />
          </Grid>
          <ResponsiveDrawerOptins />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro que cerrar sessión?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
