import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  TextField,
  InputAdornment,
  Badge,
  Link,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1976D2", boxShadow: 2, px: 2 }}
    >
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

        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {login ? (
            <>
              <Avatar alt="User" src="/path-to-avatar.jpg" sx={{ ml: 2 }} />
            </>
          ) : (
            <>
              <div>
                <Link href="/login" color="inherit">
                  <LoginIcon />
                </Link>
              </div>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
