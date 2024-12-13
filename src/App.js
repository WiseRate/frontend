import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Button, Typography, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Result from "./components/Result";
import SliderSelect from "./components/SliderSelect";
import TenureSelect from "./components/TenureSelect";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Amortization from './components/Amortization/Amortization';
import Cookies from 'js-cookie';
import DownloadPdf from './components/Amortization/downloadPdf';
import axios from 'axios';
import Footer from './components/Layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // console.log('Environment Variables:', process.env);
  const BASE_URL = process.env.REACT_APP_API_URL;
  // console.log('BASE_URL:', BASE_URL);
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

  const [providerRates, setProviderRates] = useState({});
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);



  useEffect(() => {
    // axios.get('http://localhost:8080/api/v1/bank-rates-simple')
    axios.get(`${BASE_URL}/api/v1/bank-rates-simple`)
      .then(response => {
        setProviderRates(response.data);
        setInterestRate(response.data.TD || 5.0);
      })
      .catch(error => {
        console.error('Error fetching provider rates:', error);
        setProviderRates({
          TD: 5.0,
          BMO: 5.2,
          RBC: 5.4,
          ScotiaBank: 5.6,
          CIBC: 5.8,
        });
      });
  }, []);


  useEffect(() => {
    const data = {
      loanType: "HOME_LOAN",
      province: "ON",
      municipality: "toronto",
      totalLoanAmount: loanAmount,
      downPayment: downPayment,
      interestType: "VARIABLE",
      isCompoundInterest: true,
      compoundFrequency: 2,
      annualInterestRate: interestRate,
      loanTermMonths: term * 12,
      paymentFrequency: "MONTHLY",
      newHomeBuyer: newHomeOwner,
      startDate: new Date().toISOString().split('T')[0],
      fees: {
        insurancePremium: 50.0,
        lawyerFee: 1000.0,
        appraisalFee: 300.0,
        homeInspectionFee: 500.0,
        otherFees: 0.0,
        titleInsurance: 900.0,
        propertyTax: 833.0
      },
      isActive: "true"
    };

    // axios.post('http://localhost:8080/api/v1/loan', data)
    axios.post(`${BASE_URL}/api/v1/loan`, data)
      .then(response => {
        console.log("Loan Calculation Response:", response.data);
        const { totalInterest, totalPayment } = response.data;
        setTotalInterest(totalInterest.toFixed(2));
        setTotalPayment(totalPayment.toFixed(2));
      })
      .catch(error => {
        console.error("Error calculating loan:", error);
      });
  }, [loanAmount, downPayment, interestRate, term, newHomeOwner]);


  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    setInterestRate(providerRates[newProvider] || 5.0);
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
              <Result loanAmount={loanAmount} monthlyPayment={monthlyPayment} totalInterest={totalInterest}
                totalPayment={totalPayment} homeValue={homeValue} />

            </Container>
          }
        />
        {/* Route for Login page */}
        <Route path="/login" element={<Login />} />
        {/* Route for Register page */}
        <Route path="/register" element={<Register />} />
        <Route path="/amortization" element={<Amortization
          loanAmount={loanAmount}
          interestRate={interestRate}
          term={term}
        />} />
        <Route path="/download-pdf" element={<DownloadPdf />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      </Routes>
      <ToastContainer />
<Footer />  
    </div>
  );
}

export default App;






