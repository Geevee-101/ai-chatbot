import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Navbar() {
  const auth = useAuth();

  const handleLogout = async () => {
    await auth?.logout();
    toast.success("Logout successful");
  };
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Logo />
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/chats"
                  text="Go To Chat"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  to="/"
                  text="Logout"
                  textColor="white"
                  onClick={handleLogout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/login"
                  text="Login"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  to="/signup"
                  text="Sign Up"
                  textColor="white"
                />
              </>
            )}
          </div>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
