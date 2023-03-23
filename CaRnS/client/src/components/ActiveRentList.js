import React from 'react';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { useEffect, useState} from 'react'
import { useAuth } from "../Utils/AuthContext.js";
import AddIcon from "@mui/icons-material/Add";
import "./ActiveSellList.css"
import VendorRentSingle from "./VendorRentSingle.js";

function VendorRentHistoryListings(){
    const [rentListing, setRentListings] = useState(null)
    const auth = useAuth();  
    useEffect(() => {
        const fetchBuyListings = async () => {
            const response = await fetch('http://localhost:8000/api/listing/view-active-rent/'+auth.user._id, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()

            if (response.ok){
                setRentListings(data)

            }
        }

        fetchBuyListings()
    })
    if(! auth.user){
        console.log(1)
        return (<>Loading</>)
    }

    return(
        <>
        <div className="listing-container">
        <div className="page-header">
          <text className="listing-page-title">
            Active Rent Listings
          </text>

          <Link to={"/listings"}>
            <text className="rentToggle">
            View Active Sell Listings
            </text> 
          </Link>
        </div>

        <Link to={"/createlistingrent"}>
          <div className="newListing">
            <AddIcon
              sx={{ fontSize: 50, marginTop: "20px", marginLeft: "47.5%" }}
            />
            New Rent Listing
          </div>
        </Link>

            <div className='singlelistings'>
            <Stack spacing={3}>
                {rentListing && rentListing.map((rentListing) => (
                  <VendorRentSingle listing={rentListing} />

                ))}
        </Stack>
            </div>
            </div>
        </>        
    );
}

export default VendorRentHistoryListings;