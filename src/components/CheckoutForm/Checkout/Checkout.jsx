import React, { useState, useEffect }from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment details'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1); 
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1); 

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch {
              if (activeStep !== steps.length);
            }
          };
    
          generateToken();
        }
    }, [cart]);
      
          
        const next = (data) => {
        setShippingData(data);
        nextStep();
        }


    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} setShippingData={setShippingData} nextStep={nextStep} next={next} /> : <PaymentForm nextStep={nextStep} backStep={backStep} shippingData={shippingData} checkoutToken={checkoutToken} />
  return (
    <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout;