import React, {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


import { useNotification } from '../Utils/NotificationContext';

import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import placeholder from "../assets/image/placeholder-image.png";

import Box from '@mui/material/Box';
import { Navigate, useNavigate } from 'react-router-dom';

import "./ListingForm.css";

const initialValues = {
  image: '',
  listing_name: '',
  vehicle_type: '',
  car_make:'',
  car_model: '',
  car_year: '',
  amount:'',
  location:''

}


const ListingForm = () => {

  const navigate = useNavigate();
  const { _, setNotification } = useNotification();
const onSubmit = async (data) => {
    console.log(data)


    const response = await fetch('http://localhost:8000/api/listing/post-buy', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listingName: data.listing_name,
        isBuy: true,
        buyListingDetails: {
          listingDescription: data.description,
          vehicleType: data.vehicle_type,
          salePrice: data.amount,
          location: data.location,
          isActive: true
        }
      })
    });
    const status = response.status;
    console.log(status)
    const resData = await response.json();
    console.log(resData)
  if (status === 200) {
    setNotification({
      message:"Listing successfully posted",
      severity: "success",
      open: true
    });
    navigate('/listings');
  }
  else {
    setNotification({
      message:resData.error,
      severity: "error",
      open: true
    });
  }



  };


    const [values, setValues] = React.useState({
        amount: ''
      });

    const [showhide, setShowhide] = useState("Sell");

    const handleshow = e=>{
      const getshow= e.target.value;
      setShowhide(getshow);
    }




    return(
      <listingform>
           <IconButton size="large" href='/listings' className="backArrow">
            <ArrowBackIcon/>
        </IconButton>
      <div className='listingform-container'>

      
     
        <div className='page-header'>
        <text className="page-title">
            New Sell Listing
          </text>
        </div>
        <div className="form-image">
          <img
            className="car-img"
            style={{ width: 150, height: 150, opacity: 0.5 }}
            src={placeholder}
            alt="placeholder"
          ></img>
        </div>

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

              <Box
                className="listing-info-fields"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} name="listing_name" label="Listing Name" />
                <Field as={TextField} name="vehicle_type" label="Vehicle Type" />
                <Field as={TextField} name="location" label="Location" />
              
              </Box>

              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: 636 },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} 
                name="description" 
                label="Listing Description"  
                multiline
                rows={6}
                inputProps={{ maxLength: 300 }} />
              </Box>
              

              <div className="form-price">
              <Field as={TextField}
                  name="amount"
                  label="Price"
                  sx={{marginTop: 1.5}}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                />
                    <Button 
                    type='submit' 
                    variant='contained' 
                    onSubmit={onSubmit} sx={{ m: 2 }}
                    style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40, padding: 10}}>
                  Create New Listing
                </Button>
              </div>
          
            </Container>
          </Form>
        )}
        </Formik>
        </div>
        </listingform>

    )
}

export default ListingForm;