import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, TextField, InputAdornment, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2", boxShadow: 2, px: 2 }}>
      <Toolbar>
   
        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          Task Management
        </Typography>

    
        <Box sx={{ width: "250px", mx: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

 
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar alt="User" src="/path-to-avatar.jpg" sx={{ ml: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
