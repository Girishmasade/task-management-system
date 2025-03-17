// import React, { useState } from "react";
// import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemText } from "@mui/material";
// import { Menu as MenuIcon, Search as SearchIcon, Settings, Logout } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/slice/UserSlice";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector((state) => state.user);

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <AppBar position="static" className="bg-gray-800">
//         <Toolbar className="flex justify-between">
//           {/* Sidebar Toggle Button */}
//           <IconButton edge="start" color="inherit" onClick={() => setMobileOpen(true)}>
//             <MenuIcon />
//           </IconButton>

//           {/* Logo */}
//           <Typography variant="h6" className="font-bold">
//             MyApp
//           </Typography>

//           {/* Search Bar */}
//           <div className="flex items-center bg-gray-700 px-3 py-1 rounded-lg">
//             <SearchIcon className="text-white" />
//             <InputBase placeholder="Search..." className="text-white ml-2 w-36 sm:w-64" />
//           </div>

//           {/* User Avatar */}
//           {isAuthenticated ? (
//             <IconButton onClick={handleMenuOpen}>
//               <Avatar alt={user?.name} src={user?.avatar || ""} />
//             </IconButton>
//           ) : (
//             <button onClick={() => navigate("/")} className="bg-blue-500 text-white px-4 py-1 rounded-md">
//               Login
//             </button>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* User Menu */}
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//         <MenuItem onClick={handleMenuClose}>
//           <Settings className="mr-2" /> Settings
//         </MenuItem>
//         <MenuItem onClick={handleLogout}>
//           <Logout className="mr-2" /> Logout
//         </MenuItem>
//       </Menu>

//       {/* Sidebar */}
//       <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
//         <List className="w-60">
//           <ListItem button onClick={() => navigate("/home")}>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button onClick={() => navigate("/about")}>
//             <ListItemText primary="About" />
//           </ListItem>
//           <ListItem button onClick={() => navigate("/contact")}>
//             <ListItemText primary="Contact" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;


import React from 'react'

const Navbar = () => {
  return (
    <div>
      
    </div>
  )
}

export default Navbar
