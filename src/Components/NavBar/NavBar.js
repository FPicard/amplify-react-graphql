import React, { useEffect, useState } from 'react';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AdbIcon from "@material-ui/icons/Adb";
import { Box } from "@material-ui/core/";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { IoSearchCircleSharp } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import "./NavBar.css";
import { Amplify, Auth, Hub } from 'aws-amplify';

const pages = [
  { name: "Become a service provider", url: "/" },
];

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  
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
		<MenuItem onClick={() => Auth.signOut()}>Sign out</MenuItem>
		


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

  return (


    <Box>
      <AppBar color="#000000">
		<Toolbar>

		
		
			<IconButton 
			  aria-owns={isMenuOpen ? "material-appbar" : undefined}
			  aria-haspopup="true"
			>
			<div className="LogoHomePage">
				<span role="img" aria-label="logo">
				<AdbIcon />
				</span>
				{" "}Wogee
			</div>
		    </IconButton>

		  		         <div className="Title2"> 
		         <div className="input"> 
            <InputBase placeholder="Rechercher un service" />
			 

				 </div>
			        <IconButton
					  aria-owns={isMenuOpen ? "material-appbar" : undefined}
					  aria-haspopup="true"
					  color="inherit"

					>



<IoSearchCircleSharp className="Logo3"/>

				</IconButton>
				 </div>

<div className="Logo2">
 <IconButton
					  aria-owns={isMenuOpen ? "material-appbar" : undefined}
					  aria-haspopup="true"
					  color="inherit"

					>
      
		  
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.url}
              >
                {page.name}
              </Link>
            ))}
				</IconButton>

			        <IconButton
					  aria-owns={isMenuOpen ? "material-appbar" : undefined}
					  aria-haspopup="true"
					  color="inherit"
					>

				  <GiWorld className="Logo5" />
				</IconButton>

						  {user ? (
		 
				
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
			  
			  style={{
					right: 0,
             
				  
                }}
            >
                     <Badge badgeContent={17} color="secondary" >
                <NotificationsIcon className="Logo5"/>
              </Badge>
            </IconButton>
		   ) : (
true
		  )}
		  
		  
						  {user ? (
		 
							        <IconButton
					  aria-owns={isMenuOpen ? "material-appbar" : undefined}
					  aria-haspopup="true"
					  onClick={handleProfileMenuOpen}
					  color="inherit"
					>
					
				  <AccountCircle className="Logo5"/>
				</IconButton>

		   ) : (
			        <IconButton
					  aria-owns={isMenuOpen ? "material-appbar" : undefined}
					  aria-haspopup="true"
					  onClick={() => Auth.federatedSignIn()}
					  color="inherit"
					>
					
				  Se Connecter
				</IconButton>
		  )}


				
          </div>
 
        </Toolbar>
      </AppBar>
      {user ? (
			  renderMenu()
      ) : (
	  true
      )}
      {renderMobileMenu()}
    </Box>
  );
};

export default Navbar;