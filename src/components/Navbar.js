import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Box, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is already logged in (cookie is present)
  const userCookie = Cookies.get('user');
  const isLoggedIn = Boolean(userCookie);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('user');
    alert('Successfully, You have been logged out');
    navigate('/');
  };
  return (
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 6 }}>
              <Link href="/" sx={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Home
                </Typography>
              </Link>
              <Link href="/mortgage-calculator" sx={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Mortgage Calculator
                </Typography>
              </Link>
            </Box>

            <Box>

              {isLoggedIn ? (

                <Typography
                  sx={{ color: 'white', fontWeight: 700 }}
                  onClick={handleLogout}
                >
                  Logout
                </Typography>

              ) : (
                <Link href="/login" sx={{ textDecoration: 'none', color: 'white' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Login
                  </Typography>
                </Link>
              )}
              {/* <Link href="/login" sx={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Login
              </Typography>
            </Link> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  )
}

export default Navbar
