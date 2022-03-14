import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import useStyles from '../utils/styles'

const STEPS = ['Login', 'Shipping Address', 'Payment', 'Place Order']
function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles
  return (
    <Stepper
      className={classes.transparentBackground}
      activeStep={activeStep}
      alternativeLabel
    >
      {STEPS.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CheckoutWizard
