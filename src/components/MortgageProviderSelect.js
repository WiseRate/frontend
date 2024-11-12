import React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const MortgageProviderSelect = ({ provider, setProvider }) => {

  const handleChange = (event) => {
    setProvider(event.target.value);
  };

  return (
    <Box mb={2}>
      <FormControl fullWidth>
        <InputLabel id="mortgage-provider-label">Mortgage Provider</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={provider}  
          label="Mortgage Provider"
          onChange={handleChange} 
        >
          <MenuItem value="TD">TD</MenuItem>
          <MenuItem value="BMO">BMO</MenuItem>
          <MenuItem value="RBC">RBC</MenuItem>
          <MenuItem value="ScotiaBank">ScotiaBank</MenuItem>
          <MenuItem value="CIBC">CIBC</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MortgageProviderSelect;


