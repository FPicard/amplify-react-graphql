import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AdbIcon from "@material-ui/icons/Adb";
import MoreIcon from "@material-ui/icons/MoreVert";
import { styled } from "@material-ui/core/";
import { theme } from "./Theme";
import { Box } from "@material-ui/core/";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#f3f5fb",
  padding: "0 2px",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.common.blue,
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing.unit * 3,
    width: "auto",
  },
}));

const styles = {
  root: {
    width: "100%",
    marginBottom: "10px",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  destopContainer: {

    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  mobileContainer: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
};

const pages = [
  { name: "Become a service provider", url: "/" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
		<MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
      </Menu>
    );
  };

  const renderMobileMenu = () => {
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={6} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      </Menu>
    );
  };
const styles = {
  // this group of buttons will be aligned to the right side
  toolbarButtons: {
    marginLeft: 'auto',
  },
};
  return (


    <Box sx={styles.root}>
      <AppBar position="static"  color="#f3f5fb">
		<Toolbar style={{display:'flex', justifyContent:"space-between", width:'100%'}}>
		          <AdbIcon  sx={{display: { xs: 'none', md: 'flex' }, mr: 1 }} />
				FPICARD
					

          <Search>
            <InputBase placeholder="Looking for a services" />
          </Search>

          <Box sx={styles.destopContainer}>
		  
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.url}
                style={{
                  padding: "6px 4px",
                  color: "black",
                  textDecoration: "none",
				  
                }}
              >
                {page.name}
              </Link>
            ))}


            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
			  style={{
					right: 0,
             
				  
                }}
            >
                     <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
		  
		  
		  


			        <IconButton
					  aria-owns={isMenuOpen ? "material-appbar" : undefined}
					  aria-haspopup="true"
					  onClick={handleProfileMenuOpen}
					  color="inherit"

					>

				  <AccountCircle />
				</IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      {renderMenu()}
      {renderMobileMenu()}
    </Box>
  );
};

export default Navbar;