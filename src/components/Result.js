import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

<<<<<<< HEAD
const Result = ({ loanAmount, monthlyPayment, homeValue, term }) => {
  const totalInterest = (monthlyPayment * term * 12) - loanAmount;
  const navigate = useNavigate();
=======
const Result = ({ loanAmount, monthlyPayment, homeValue, term, totalInterest,totalPayment }) => {

  
>>>>>>> c3fcd22de0c8e3e92eb9de6c8fdbda27e0a64a6c
  const chartData = {
    labels: ['Home Value', 'Total Interest'],
    datasets: [
      {
        data:  [homeValue, totalInterest],  
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#FFFFFF', '#FFFFFF'],
        borderWidth: 1,
      },
    ],
  };
<<<<<<< HEAD


  // Configure chart options
=======
  
>>>>>>> c3fcd22de0c8e3e92eb9de6c8fdbda27e0a64a6c
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Function to navigate to Amortization page
  const goToAmortization = () => {
    navigate('/amortization');  
  };

  return (
    <Box mt={2}>
      <Box marginBottom={2} marginTop={4}>
        <Typography variant="h6">Loan Summary</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Loan Amount</Typography>
        <Typography variant="body1">${loanAmount.toLocaleString()}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="body1">Monthly Payment</Typography>
        <Typography variant="body1">${monthlyPayment}</Typography>
      </Box>
<<<<<<< HEAD

=======
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="body1">Total Interest Amount</Typography>
        <Typography variant="body1">${totalInterest}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="body1">Total Payment Amount</Typography>
        <Typography variant="body1">${totalPayment}</Typography>
      </Box>
>>>>>>> c3fcd22de0c8e3e92eb9de6c8fdbda27e0a64a6c
      {/*Here is the Pie Chart */}
      
      <Box mt={3} height={250}>
        <Pie data={chartData} options={chartOptions} />
      </Box>
<<<<<<< HEAD

      {/* Button to navigate to Amortization page */}
      <Box mt={3}>
      <Button variant="contained" color="primary" onClick={goToAmortization}>
          View Amortization Schedule
        </Button>


      </Box>
    </Box>


=======
      
    </Box>
    
>>>>>>> c3fcd22de0c8e3e92eb9de6c8fdbda27e0a64a6c
  );
};

export default Result;








