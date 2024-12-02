import React from 'react';
import SliderComponent from './common/SliderComponent';
import { Typography, Box, Button, Stack } from '@mui/material';
import MortgageProviderSelect from './MortgageProviderSelect'; 

const SliderSelect = ({
  homeValue,
  downPayment,
  setHomeValue,
  setDownPayment,
  interestRate,
  setInterestRate,
  handleProviderChange,
  newHomeOwner,    
  setNewHomeOwner 
}) => {
  const loanAmount = homeValue - downPayment;
  const handleNewHomeOwner = () => {
    setNewHomeOwner(true); 
  };

  const handleNotNewHomeOwner = () => {
    setNewHomeOwner(false); 
  };
  return (
    <>
      <Box mb={2}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleNewHomeOwner}
          >
            New Home Owner
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleNotNewHomeOwner}
          >
            Not a New Home Owner
          </Button>
        </Stack>
      </Box>

      <SliderComponent
        min={0}
        max={5000000}
        defaultValue={homeValue}
        step={1000}
        title="Home Value"
        value={homeValue}
        onChange={(e, value) => setHomeValue(value)}
      />

      <SliderComponent
        min={0}
        max={5000000}
        defaultValue={downPayment}
        step={1000}
        title="Down Payment"
        value={downPayment}
        onChange={(e, value) => setDownPayment(value)}
      />

      <Box marginTop={4} marginBottom={4}>
      <MortgageProviderSelect provider={interestRate} setProvider={handleProviderChange} />
      </Box>

      <SliderComponent
        min={0}
        max={10}
        step={0.01}
        title="Interest Rate"
        value={interestRate}  
        onChange={(e, value) => setInterestRate(value)}  
      />


    </>
  );
};

export default SliderSelect;


