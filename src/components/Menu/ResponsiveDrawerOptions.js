import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import MapIcon from "@mui/icons-material/Map";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAuth from "@/hooks/useAuth";

const { logout } = useAuth();

export const drawerOptions = (
  <div>
    <Toolbar />
    <Divider />

    <List>
      <Link href="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
    <Divider />

    <List>
      <Link href="/cart">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Carrito" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/account/orders">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/account/favorites">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favoritos" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
    {/* <List>
      {["Pedidos", "Lista favoritos", "Cerrar sessión"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List> */}

    <Divider />
    <List>
      <Link href="/account/changename">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Cambiar nombre" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/account/changemail">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AlternateEmailIcon />
            </ListItemIcon>
            <ListItemText primary="Cambiar email" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/account/changeusername">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Cambiar username" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/account/changepassword">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Cambiar contraseña" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/account/address">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Mis direcciones" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
    <Divider />
    {/* <List>
      {[
        "Cambiar nombre",
        "Cambiar email",
        "Cambiar username",
        "Cambiar contraseña",
        "Mis direcciones",
      ].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}

    </List> */}
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sessión" />
        </ListItemButton>
      </ListItem>
    </List>
  </div>
);
