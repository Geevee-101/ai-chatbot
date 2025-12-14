import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink';
import { useAuth } from '../context/AuthContext';

export function Header () {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: 'static', boxShadow: 'none' }}>
      <Toolbar>
        <Typography component="div" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Logo />
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" textColor="black"/>
                <NavigationLink bg="#51538f" to="/logout" text="Logout" textColor="white" onClick={auth.logout} />
              </> 
            ) : (
              <>
                <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black"/>
                <NavigationLink bg="#51538f" to="/signup" text="Sign Up" textColor="white" />
              </>
            )}
          </div>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header