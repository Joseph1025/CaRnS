import React, {useEffect, useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useNotification } from '../Utils/NotificationContext';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useAuth } from "../Utils/AuthContext.js";

import Box from '@mui/material/Box';
//import { Grid, tableBodyClasses } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import BuyCheckoutPage from './pages/BuyCheckoutPage';

const today = new Date()

const initialValues = {
  card_number: '',
  card_holder:'',
  expiry_date: '',
  cvc: '',
}


const BuyCheckout = () => {
    const auth = useAuth()
    const params = useParams()
    let navigate  = useNavigate()
    const { _, setNotification } = useNotification()

    const [buyListing, setBuyListing] = useState(null);

    useEffect(() => {
        const url = 'http://localhost:8000/api/listing/view-detail-buy/'+ params.listId;
		const fetchBuyDetail = async () => {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			const data = await response.json()
            
            if (response.ok) {
                setBuyListing(data)
				document.getElementById('sale-price').innerHTML = data.buyListingDetails.salePrice;
            }
        }
        fetchBuyDetail()
    }, [])
    

    // const { _, setNotification } = useNotification();
    const onSubmit = async (data) => {
        if (! auth.user){
			return
		}
		const response = await fetch(
			"http://localhost:8000/api/transaction/log",
			{
				method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"customerID": auth.user._id,
					"listingID": buyListing._id,
				}),
			}
		);

        const status = response.status;
        console.log(status)
        const resData = await response.json();
        console.log(resData)

        if (status === 200) {
			navigate("/buy");
            
		} else {
			setNotification({
				message: resData.error,
				severity: "error",
				open: true,
			});
		}
    }


    const [value, setValue] = React.useState('cash');

    const handleChange = (event) => {
        setValue(event.target.value);
    };




    return(
      <buycheckout>

 
      <IconButton size="large" href={'/buydetail/'+ params.listId} className="backArrow">
      <ArrowBackIcon />
    </IconButton>

    <Formik 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {(props) => (
          
        
        <Form>
            <Container maxWidth="md" >
          
              <Typography fontSize={22}>
                  Booking Details 
              </Typography>
            
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} name="card_number" label="Card Number" inputProps={{ maxLength: 16 }} />
                <Field as={TextField} name="card_holder" label="Card Holder"  />              
              </Box>


              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '19ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} name="expiry_date" label="Expiry Date"  inputProps={{ maxLength: 5 }}/>
                <Field as={TextField} name="cvc" label="CVC" inputProps={{ maxLength: 3 }}/>
              </Box>


              <Box fontSize={17}  >
                <text  className="field-name">Total: $</text>
                <text className="field-value" id="sale-price"> </text>
              </Box>

                
              
              <Button type='submit' variant='contained' onSubmit={onSubmit} sx={{ m: 2 }}
              style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40}}>
                  Buy
              </Button>
   
            </Container>

        </Form>
        )}
    </Formik>
    </buycheckout>
    )
}

export default BuyCheckout;