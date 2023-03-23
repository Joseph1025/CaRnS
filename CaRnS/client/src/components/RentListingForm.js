import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useNotification } from '../Utils/NotificationContext';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import { Formik, Field, Form, ErrorMessage } from 'formik'


import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import './ListingForm.css'
import placeholder from "../assets/image/placeholder-image.png";
import { Navigate, useNavigate } from 'react-router-dom';

// This is the page for create a rent listing

const initialValues = {
    image: '',
    listing_name: '',
    vehicle_type: '',
    car_make: '',
    car_model: '',
    car_year: '',
    daily_fee: '',
    location: '',
    start_date: '',
    end_date: ''

}


const RentListingForm = () => {
    const navigate = useNavigate();
    const { _, setNotification } = useNotification();
    const onSubmit = async (data) => {
        console.log(data);


        const response = await fetch('http://localhost:8000/api/listing/post-rent', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listingName: data.listing_name,
                isBuy: false,
                rentListingDetails: {
                    listingDescription: data.description,
                    vehicleType: data.vehicle_type,
                    rentPrice: data.daily_fee,
                    location: data.location,
                    availabilityStart: data.start_date,
                    availabilityEnd: data.end_date,
                }
            })
        });
        const status = response.status;
        console.log(status)
        const resData = await response.json();
        console.log(resData)
        if (status === 200) {
            setNotification({
                message: "Listing successfully posted",
                severity: "success",
                open: true
            });
            navigate('/listingrent')
        }
        else {
            setNotification({
                message: resData.error,
                severity: "error",
                open: true
            });
        }



    };


    const [values, setValues] = React.useState({
        daily_fee: ''
    });

    const [showhide, setShowhide] = useState("Sell");

    const handleshow = e => {
        const getshow = e.target.value;
        setShowhide(getshow);
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };



    return (
        <createrentlisting>
            <IconButton size="large" className='backArrow' href='/listingrent'>
                <ArrowBackIcon />
            </IconButton>
            <div className='listingform-container'>



                <div className='page-header'>
                    <text className="page-title">
                        New Rent Listing
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
                                    className='listing-info-fields'
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



                                <Typography sx={{ marginLeft: 2 }} fontSize={17} color='grey'>
                                    Select a start and end date
                                </Typography>
                                <Box className='listing-info-fields'
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}>
                                    <Field as={TextField} name="start_date" label="Start Date" helperText="YYYY-MM-DD" />
                                    <Field as={TextField} name="end_date" label="End Date" helperText="YYYY-MM-DD" />
                                </Box>
                                <div className='form-price'>
                                    <FormControl sx={{ m: 0 }} >
                                        <Field as={TextField}
                                            name="daily_fee"
                                            label="Price Per Day"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                    </FormControl>




                                    <Button
                                        type='submit'
                                        variant='contained'
                                        onSubmit={onSubmit} sx={{ m: 2 }}
                                        style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40, padding: 10 }}>
                                        Create New Listing
                                    </Button>

                                </div>



                            </Container>
                        </Form>
                    )}
                </Formik>
            </div>
        </createrentlisting>
    )
}

export default RentListingForm;