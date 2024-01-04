import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Style/baseStyle.scss";
import style from "./AdminHome.module.scss";
import { PATH } from "../../Routes/path";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { UserAction } from "../../Store/LoginAdminSlice/slice";
const drawerWidth = 240;
const AdminHome = () => {
  const { user } = useSelector((state) => state.User);
 
  const listManage = [
    "ManageUser",
    "ManageJob",
    "ManageJobStyle",
    "ManageServices",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState(listManage[0]);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(UserAction.setLogout());
    navigate("/admin/admin-login");
  };
  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "rgb(99, 9, 99)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 90,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            transform: "rotate(45deg)",
            boxShadow:
              "rgba(240, 46, 170, 0.4)0px 0px 0px 2px inset, rgba(240, 46, 170, 0.3) 10px -10px 0px -3px, rgba(240, 46, 170, 0.2) 10px -10px, rgba(240, 46, 170, 0.1) 20px -20px 0px -3px, rgba(240, 46, 170, 0.05) 20px -20px",
          }}
        >
          <Link to={"/admin"}>
            <Typography
              fontSize={27}
              fontWeight={900}
              sx={{ transform: "rotate(-45deg)" }}
            >
              Fi
            </Typography>
          </Link>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {listManage.map((item) => {
          return (
            <ListItem key={item}>
              <ListItemButton onClick={() => setInfo(item)}>
                {item}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "transparent",
        }}
      >
        <Toolbar
          sx={{
            position: "fixed",
            zIndex: 99,
            background: "white",
            width: { sm: `calc(100% - ${drawerWidth}px)`, xs: "100%" },

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                background: "rgb(99, 9, 99)",
                borderRadius: "3px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box className={style.waviy}>
              <span style={{ "--i": 1 }}>F</span>
              <span style={{ "--i": 2 }}>I</span>
              <span style={{ "--i": 3 }}>V</span>
              <span style={{ "--i": 4 }}>E</span>
              <span style={{ "--i": 5 }}>R</span>
              <span style={{ "--i": 6 }}>R</span>{" "}
              <span style={{ "--i": 7 }}>A</span>
              <span style={{ "--i": 8 }}>D</span>
              <span style={{ "--i": 9 }}>M</span>
              <span style={{ "--i": 10 }}>I</span>
              <span style={{ "--i": 11 }}>N</span>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <Button onClick={() => navigate("/admin/admin-login")}>
                Đăng nhập
              </Button>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={handleLogout}>Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
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
        <Box>
          <Table info={info} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
