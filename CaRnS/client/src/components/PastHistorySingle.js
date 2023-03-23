import * as React from 'react';
import { useRef, useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useNotification } from '../Utils/NotificationContext';
import "./VendorHistorySingle.css"
import placeholder from "../assets/image/placeholder-image.png";
import { orange } from '@mui/material/colors';

export default function PastHistorySingle(props) {
    
    const { listing } = props;

    
    return (
        <historycard>
        <Paper elevation={4} className ='vendor-listing-card' sx={{padding:'30px', paddingBottom:'40px'}}>

            <Typography
            variant="h5"
            color="text.primary"
            fontFamily={'montserrat'}
            gutterBottom
            >
                {listing.listingName}
            </Typography>
        <div className='vendor-history-content'>

       
            <div className="listing-image">
          <img
            className="car-img"
            style={{ width: 150, height: 150, opacity: 0.5 }}
            src={placeholder}
            alt="placeholder"
          ></img>
        </div>
        <div className='vendor-history-info'>
        <Typography
        fontFamily={'redhat'}
        variant="h5"
        color="text.primary"
        gutterBottom
        >
        Type: {listing.buyListingDetails.vehicleType}
        </Typography>
        <Typography
        fontFamily={'redhat'}
        variant="h5"
        color="text.primary"
        gutterBottom
        >
        Location: {listing.buyListingDetails.location}
        </Typography>
        <Typography
        fontFamily={'redhat'}
        variant="h5"
        color="text.primary"
        gutterBottom
        >
        Description: {listing.buyListingDetails.listingDescription}
        </Typography>
        <div className='vendor-history-price'>
        <Typography
        fontFamily={'redhat'}
        variant="h5"
        color="text.primary"
        gutterBottom
        >
        
        Price: <span style={{color:'#e87123', fontWeight:'bolder'}}>${listing.buyListingDetails.salePrice} </span>
        </Typography>
        </div>
        </div>
        </div>
        </Paper>
        
        </historycard>
    );
}