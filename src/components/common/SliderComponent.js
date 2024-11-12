import React from 'react'
import Slider from '@mui/material/Slider';
import { Stack, Typography, TextField } from '@mui/material';

const SliderComponent = ({ title, value, onChange, min, max, step, defaultValue }) => {

    const handleSliderChange = (event, newValue) => {
        onChange(event, newValue);  
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange(event, Number(newValue));  
        }
    };

    const getPrefix = () => {
        if (title === "Interest Rate") {
          return '%';
        }
        return '$';
      };

    return (
        <>
            <Stack gap={1}>
                <Typography variant='subtitle2'>{title}</Typography>
                <Stack direction="row" spacing={2}>
                    <Typography variant='h5' sx={{ flex: 1 }}>
                        {getPrefix()}{value}
                    </Typography>
                    <TextField
                        label="Enter Value"
                        variant="outlined"
                        value={value}  
                        onChange={handleInputChange}
                        type="number"
                        sx={{ flex: 1 }}
                    />
                </Stack>
            </Stack>

            <Slider
                value={value}  
                min={min}
                max={max}
                step={step}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                marks
                aria-label={title}
            />
        </>
    )
}

export default SliderComponent
