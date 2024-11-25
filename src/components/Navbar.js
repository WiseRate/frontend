import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, Box, Link } from '@mui/material';

const Navbar = () => {
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
            <Link href="/login" sx={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Login
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
