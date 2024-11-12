import React from 'react';
import { Typography, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Result = ({ loanAmount, monthlyPayment, homeValue, term }) => {
  const totalInterest = (monthlyPayment * term * 12) - loanAmount;

  const chartData = {
    labels: ['Home Value', 'Total Interest'],
    datasets: [
      {
        data: [500000, 200000],  // Test with static values
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#FFFFFF', '#FFFFFF'],
        borderWidth: 1,
      },
    ],
  };
  

  // Configure chart options
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
      
      {/*Here is the Pie Chart */}
      <Box mt={3} height={250}>
        <Pie data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default Result;








