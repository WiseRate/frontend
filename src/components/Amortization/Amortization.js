import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Cookies from 'js-cookie';

const AmortizationSchedule = ({ loanAmount, interestRate, term }) => {
  const [amortizationData, setAmortizationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downPayment, setDownPayment] = useState(100000);
  const [newHomeOwner, setNewHomeOwner] = useState(false);
  const [error, setError] = useState(null);
  const [authHeader, setAuthHeader] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Set AuthHeader via Cookies
    setAuthHeader(Cookies.get('user'));

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
      fees: {

      }
    };

    // Post data to backend for amortization calculation
    axios.post('http://localhost:8080/api/v1/amortization-schedule', data, {
      withCredentials: true,
      // auth: {
      //   username: 'yourUsername',
      //   password: 'yourPassword'
      // }
      headers: {
        'Authorization': authHeader,
      }
    })
      .then(response => {
        console.log("Amortization Schedule Response:", response.data);
        setAmortizationData(response.data.amortizationSchedule);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching amortization schedule:", error);
        setError("Failed to fetch amortization schedule. Please try again later.");
        setLoading(false);
      });
  }, [loanAmount, interestRate, term]);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Amortization Schedule
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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