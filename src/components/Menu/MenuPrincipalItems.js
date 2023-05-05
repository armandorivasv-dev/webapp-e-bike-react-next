// import * as React from "react";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import SwapVertIcon from "@mui/icons-material/SwapVert";
// import StoreIcon from "@mui/icons-material/Store";
// //import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useTheme } from "@mui/material/styles";

// export const MenuPrincipalListItems = () => {
//   const [selectedIndex, setSelectedIndex] = useState(1);

//   const theme = useTheme();

//   const handleListItemClick = (event, index) => {
//     setSelectedIndex(index);
//   };

//   const iconStyles = {
//     bgcolor: "red",
//     color: "common.white",
//     fontSize: 40,
//     borderRadius: 2,
//     padding: 1,
//   };

//   const listItemButtonStyles = {
//     "&.Mui-selected": {
//       backgroundColor: "#310c02",
//     },
//     "&.Mui-focusVisible": {
//       backgroundColor: "#310c02",
//     },
//     ":hover": {
//       backgroundColor: "#310c02",
//     },
//   };

//   return (
//     <div>
//       <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
//         <ListItemButton
//           selected={selectedIndex === 1}
//           onClick={(event) => handleListItemClick(event, 1)}
//           sx={listItemButtonStyles}
//         >
//           <ListItemIcon>
//             <DashboardIcon sx={iconStyles} />
//           </ListItemIcon>
//           <ListItemText sx={{ pl: 4 }} primary="Inicio" />
//         </ListItemButton>
//       </Link>

//       <Link to="perfil" style={{ textDecoration: "none", color: "#fff" }}>
//         <ListItemButton
//           selected={selectedIndex === 2}
//           onClick={(event) => handleListItemClick(event, 2)}
//           sx={listItemButtonStyles}
//         >
//           <ListItemIcon>
//             <PeopleIcon sx={iconStyles} />
//           </ListItemIcon>
//           <ListItemText sx={{ pl: 4 }} primary="Perfil" />
//         </ListItemButton>
//       </Link>

//       <Link
//         to="reporte-locales"
//         style={{ textDecoration: "none", color: "#fff" }}
//       >
//         <ListItemButton
//           selected={selectedIndex === 3}
//           onClick={(event) => handleListItemClick(event, 3)}
//           sx={listItemButtonStyles}
//         >
//           <ListItemIcon>
//             <StoreIcon sx={iconStyles} />
//           </ListItemIcon>
//           <ListItemText sx={{ pl: 4 }} primary="Locales" />
//         </ListItemButton>
//       </Link>

//       <Link
//         to="reporte-transferencias"
//         style={{ textDecoration: "none", color: "#fff" }}
//       >
//         <ListItemButton
//           selected={selectedIndex === 4}
//           onClick={(event) => handleListItemClick(event, 4)}
//           sx={listItemButtonStyles}
//         >
//           <ListItemIcon>
//             <SwapVertIcon sx={iconStyles} />
//           </ListItemIcon>
//           <ListItemText sx={{ pl: 4 }} primary="Transferencias" />
//         </ListItemButton>
//       </Link>
//     </div>
//   );
// };
