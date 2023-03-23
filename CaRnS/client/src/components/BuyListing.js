import React from 'react';
import { Link } from "react-router-dom";

// import for card component
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useEffect, useState} from 'react'
import "./Listings.css";

import placeholder from "../assets/image/placeholder-image.png";

function BuyListings(){
    const [buyListing, setBuyListings] = useState(null)
    
    useEffect(() => {
        const fetchBuyListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/view-buy', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()

            if (response.ok){
                setBuyListings(data)

            }
        }

        fetchBuyListings()
    }, [])



    return(
        <buylisting>
            <h1 style={{color: 'black'}}> Buy </h1>
            <div className='listings'>
                {buyListing && buyListing.map((buyListing) => (

                    // Naive implementation of listing
                    // <p key={buyListing._id}>
                    //     <Link to={'/buydetail/'+buyListing._id}>
                    //         {buyListing.listingName}
                    //     </Link>
                    // </p>
                    <Link to={'/buydetail/'+buyListing._id} className='listingCardcontainer'>
                        <Card sx={{ minWidth: 275 }} elevation={4}>
                            
                            <CardContent className='buy-listing-content' sx={{borderRadius: 15}}>
                                <Typography variant="h5" component="div" sx={{fontFamily: 'montserrat'}}>
                                    {buyListing.listingName}
                                </Typography> 
                                <div className="listingimg"> 
                                <img src = {placeholder} style={{height: 200, width: 200, opacity: 0.5} } 
                               ></img>
                                </div>
                                <Typography variant="h5" component="div" sx= {{fontFamily: 'redhat'}}>
                                    Price: <span style={{color:'#e87123'}}>{'$'+ buyListing.buyListingDetails.salePrice } </span>
                                    
                                </Typography> 
                               
                            </CardContent>
                        </Card>
                        </Link>
                    

                ))}
            </div>
        </buylisting>        
    );
}

export default BuyListings;