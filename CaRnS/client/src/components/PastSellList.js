import React from 'react';
import { Link } from "react-router-dom";
import "./VendorHistory.css";
import PastHistorySingle from "./PastHistorySingle";
import Stack from '@mui/material/Stack';
import { useEffect, useState} from 'react'
import { useAuth } from "../Utils/AuthContext.js";

function PastSellList(){
    const [buyListing, setBuyListings] = useState(null)
    const auth = useAuth();  
    useEffect(() => {
        const fetchBuyListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/view-past-buy/'+auth.user._id, {
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
    })
    if(! auth.user){
        console.log(1)
        return (<>Loading</>)
    }

    return(
        <pastselllist>
        <div className="listing-container">
        <div className='page-header'> 
        <text className="listing-page-title">Past Sell Listings</text>
        <Link to={"/vendorbookinghistory"}>
        <text className="rentToggle">
        View Booking History
        </text> 
        </Link>
        </div>

            <div className='vendor-history'>
            <Stack spacing={2}>
                {buyListing && buyListing.map((buyListing) => (
                    <PastHistorySingle listing = {buyListing}/>

                ))}
        </Stack>
            </div>
            </div>
        </pastselllist>        
    );
}

export default PastSellList;