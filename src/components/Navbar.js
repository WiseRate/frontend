import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
        <Container>
        <Toolbar sx={{display:'flex',justifyContent:'center'}}>
          <Typography variant="h5" component="div" sx={{ fontWeight:700 }}>
            RateWise Mortgage Calculator
          </Typography>
        </Toolbar>
        </Container>
      </AppBar>
  )
}

export default Navbar