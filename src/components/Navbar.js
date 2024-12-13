import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Box, Link, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { use } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is already logged in (cookie is present)
  const userCookie = Cookies.get("user");
  // const isLoggedIn = Boolean(userCookie);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    if (Cookies.get("user") !== undefined) {
      setIsLoggedIn(true);
    }
  }, [userCookie]);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);
    console.log("User logged out, showing success toast");
    toast.success(`You have been logged out`);
    navigate("/");
  };

  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 6 }}>
              <Link href='/' sx={{ textDecoration: "none", color: "white" }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Home
                </Typography>
              </Link>
              <Link href='/mortgage-calculator' sx={{ textDecoration: "none", color: "white" }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Mortgage Calculator
                </Typography>
              </Link>
            </Box>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center", color: "white", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>
              {isLoggedIn ? (
                <>
                  <Link href='/dashboard' sx={{ textDecoration: "none", color: "white" }}>
                    <span style={{ fontWeight: 500 }}>
                      Dashboard
                    </span>
                  </Link>
                  <button style={{ color: "white", fontWeight: 700, cursor: "pointer", fontSize: "1rem", backgroundColor: "#3186a9" }} onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link href='/login' sx={{ textDecoration: "none", color: "white" }}>
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>
                    Login
                  </Typography>
                </Link>
              )}
              {/* <Link href="/login" sx={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Login
              </Typography>
            </Link> */}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
