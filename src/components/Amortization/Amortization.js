import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Cookies from 'js-cookie';
import './Amortization.css';
import DownloadPdf from './downloadPdf';



const AmortizationSchedule = ({ loanAmount, interestRate, term }) => {
  const [amortizationData, setAmortizationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downPayment, setDownPayment] = useState(100000);
  const [newHomeOwner, setNewHomeOwner] = useState(false);
  const [error, setError] = useState(null);
  const [authHeader, setAuthHeader] = useState('');
  const BASE_URL = process.env.REACT_APP_API_URL;

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
    isActive: "true",
    fees: {}
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    setAuthHeader(Cookies.get('user'));

    axios
      // .post('http://localhost:8080/api/v1/amortization-schedule', data, {
      .post(`${BASE_URL}/api/v1/amortization-schedule`, data, {
        withCredentials: true,
        headers: {
          'Authorization': authHeader,
        },
      })
      .then((response) => {
        console.log("Amortization Schedule Response:", response.data);
        setAmortizationData(response.data.amortizationSchedule);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching amortization schedule:", error);
        setError("Failed to fetch amortization schedule. Please try again later.");
        setLoading(false);
      });
  }, [loanAmount, interestRate, term]);

  return (
    <Box className="amortization-container">
      <Typography variant="h3" className="amortization-title">
        Amortization Schedule
      </Typography>
      {/* <Box sx={{ display: "flex", justifyContent:"flex-end", marginBottom: 2,  }}>
        <DownloadPdf data={data} authHeader={authHeader} />
      </Box> */}
      <Box sx={{ position: 'absolute', right: '350px', top: '90px', marginBottom: 2 }}>
        <DownloadPdf data={data} authHeader={authHeader} />
      </Box>
      {loading ? (
        <Typography className="loading-text">Loading...</Typography>
      ) : error ? (
        <Typography className="error-text">{error}</Typography>
      ) : (
        <TableContainer component={Paper} className="table-container">

          <Table aria-label="amortization schedule table">

            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Total Paid</TableCell>
                <TableCell>Principal Paid</TableCell>
                <TableCell>Interest Paid</TableCell>
                <TableCell>Remaining Balance</TableCell>

              </TableRow>

            </TableHead>
            <TableBody>
              {amortizationData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.totalPaid.toFixed(2)}</TableCell>
                  <TableCell>{row.principalPaid.toFixed(2)}</TableCell>
                  <TableCell>{row.interestPaid.toFixed(2)}</TableCell>
                  <TableCell>{row.remainingBalance.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AmortizationSchedule;
