// SampleComponent.js
/*import React from 'react';

// Creating a functional component called SampleComponent
const NavBar = () => {
  return (
    <div>
      <h1>This is a Sample Component!
        Called from the NavBar
      </h1>
      <p>Welcome to NavBar Component</p>
    </div>
  );
};

// Exporting the component to use it elsewhere
export default NavBar;*/

/*import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <div className="desktop-menu">
            <Button color="inherit">Home</Button>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">About</Button>
          </div>
          <IconButton color="inherit" edge="end" onClick={handleMenuClick} sx={{ display: { xs: 'block', lg: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem onClick={handleMenuClose}>Features</MenuItem>
            <MenuItem onClick={handleMenuClose}>Pricing</MenuItem>
            <MenuItem onClick={handleMenuClose}>About</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;*/

import React, { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent fixed top-0 left-0 w-full z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left side: App name */}
        <div className="text-white text-2xl font-semibold">
          Sample
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Right side: Links */}
        <div className={`flex space-x-6 md:flex md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <a href="#about" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">
            About
          </a>
          <a href="#login" className="text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">
            Log In
          </a>
          <a href="#signup" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300">
            Sign Up
          </a>
        </div>
      </div>

      {/* Mobile menu: When the hamburger menu is clicked */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4">
          <a href="#about" className="block text-center py-2 hover:bg-blue-700">About</a>
          <a href="#login" className="block text-center py-2 hover:bg-blue-700">Log In</a>
          <a href="#signup" className="block text-center py-2 bg-blue-600 hover:bg-blue-700">Sign Up</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;




