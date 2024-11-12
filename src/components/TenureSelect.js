import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TenureSelect = ({term, setTerm}) => {

  const handleTermChange = (event,value) => {
    setTerm(value);
  };

  return (
    <Box marginTop={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mortgage Term</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={term}
          label="Mortgage Term"
          onChange={handleTermChange}
        >
          <MenuItem value={5}>5 years</MenuItem>
          <MenuItem value={10}>10 years</MenuItem>
          <MenuItem value={15}>15 years</MenuItem>
          <MenuItem value={20}>20 years</MenuItem>
          <MenuItem value={25}>25 years</MenuItem>
          <MenuItem value={30}>30 years</MenuItem>
        </Select>
      </FormControl>
    </Box>
    
  )
}

export default TenureSelect