import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import { Container, Button, Typography, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register"
import Result from "./components/Result";
import SliderSelect from "./components/SliderSelect";
import TenureSelect from "./components/TenureSelect";
import { useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Amortization from './components/Amortization/Amortization';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [homeValue, setHomeValue] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [term, setTerm] = useState(5);
  const [provider, setProvider] = useState("TD"); 
  const [interestRate, setInterestRate] = useState(5); 
  const [newHomeOwner, setNewHomeOwner] = useState(false);
  const loanAmount = homeValue - downPayment;



  // Check if user is logged in (if a cookie is present)
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie)); 
    }
  }, []);

  const providerRates = {
    TD: 5.0,
    BMO: 5.2,
    RBC: 5.4,
    ScotiaBank: 5.6,
    CIBC: 5.8
  };

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider); 
    setInterestRate(providerRates[newProvider]); 
  };

  const calculateMonthlyPayment = (loanAmount, interestRate, term) => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    return monthlyPayment.toFixed(2); 
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, term);

  
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route 
          path="/" 
          element={
            <Container 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                textAlign: 'center' 
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome to WiseRate
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Your Comprehensive Mortgage Planning Tool
              </Typography>

              <CurrencyExchangeIcon sx={{ fontSize: 100, color: 'primary.main', mb: 4 }} />

              <Button 
                variant="contained" 
                color="primary" 
                href="/mortgage-calculator"
              >
                Get Started
              </Button>
            
            </Container>
          }
        />

        <Route 
          path="/mortgage-calculator" 
          element={
            <Container sx={{ marginTop: 4, width: "50%" }}>
              <SliderSelect
                homeValue={homeValue}
                downPayment={downPayment}
                setHomeValue={setHomeValue}
                setDownPayment={setDownPayment}
                interestRate={interestRate}
                setInterestRate={setInterestRate}
                handleProviderChange={handleProviderChange} 
                newHomeOwner={newHomeOwner}   
                setNewHomeOwner={setNewHomeOwner} 
              />
              <TenureSelect term={term} setTerm={setTerm} />
              <Result loanAmount={loanAmount} monthlyPayment={monthlyPayment} />
            </Container>
          }
        />
        {/* Route for Login page */}
       <Route path="/login" element={<Login />} />
       {/* Route for Register page */} 
       <Route path="/register" element={<Register />} /> 
      {/* Route for Amortization page */}
      <Route  path="/amortization"  element={<Amortization />} 
        />
      </Routes>

    </div>
  );
}

export default App;





