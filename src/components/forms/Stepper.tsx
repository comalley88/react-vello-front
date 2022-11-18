import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate } from 'react-router-dom';

export default function ProgressMobileStepper({activeStep, handleClick}: {activeStep: number, handleClick?: () => void}) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <MobileStepper
      variant="progress"
      steps={6}
      position="static"
      activeStep={activeStep}
      sx={{width: "100%", flexGrow: 1, mx: "auto", px: 0, my: 2 }}
      nextButton={
        <Button
        onClick={handleClick}
        type='submit' 
        color='primary'
        size="small">
          {activeStep === 5 ? "Confirm" : "Next"}
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
        color='primary'
        size="small" onClick={() => navigate(-1)} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
