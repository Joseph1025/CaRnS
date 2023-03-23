import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ContactInfo from "./ContactInfo";
import "./RentDetail.css";
import placeholder from "../assets/image/placeholder-image.png";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../Utils/AuthContext.js";

function RentDetail() {
    const [rentListing, setRentListing] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    let params = useParams();
    let auth = useAuth();
    let buyer = true;
    if (auth.user){
      buyer = (auth.user.userType == 'buyer')
    }
    useEffect(() => {
        const url =
            "http://localhost:8000/api/listing/view-detail-rent/" + params.listId;
        const fetchRentDetail = async () => {
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                setRentListing(data);
            }
        };

        fetchRentDetail();
    }, []);

    //console.log(rentListing);

    return (
        <rentdetail>
            <IconButton size="large" href='/rent' className="backArrow">
                <ArrowBackIcon/>
            </IconButton>
            <div className="rentdetail">
                {rentListing ? (
                    <>

                        <div className="rentdetail-container">
                            <div className="rentDetail-left">
                                <div className="rentlistingimg">
                                    <img
                                        src={placeholder}
                                        style={{ height: 250, width: 250, opacity: 0.5 }}
                                    ></img>
                                </div>
                                <ContactInfo uid={rentListing.vendorID} />
                            </div>
                            <div className="rentDetail-right">
                                <h1 style={{ color: "black", fontSize: 36 }}> {rentListing.listingName} </h1>
                                <div className="rentDetail-info">
                                    <Paper elevation={0}>
                                        <h2 style={{ color: "black" }}> Vehicle Type: </h2>
                                        <h3 style={{ color: "black" }}>
                                            {rentListing.rentListingDetails.vehicleType}
                                        </h3>
                                    </Paper>
                                    <Paper elevation={0}>
                                        <h2 style={{ color: "black" }}> Location: </h2>
                                        <h3 style={{ color: "black" }}>
                                            {rentListing.rentListingDetails.location}
                                        </h3>
                                    </Paper>
                                    <Paper elevation={0}>
                                        <h2 style={{ color: "black" }}> Description: </h2>
                                        <h4 style={{ color: "black" }}>
                                            {rentListing.rentListingDetails.listingDescription}
                                        </h4>
                                    </Paper>

                                    <Paper elevation={0}>
                                        <h2 style={{ color: "black" }}> Price per day: <span style={{color: '#e87123'}}>${rentListing.rentListingDetails.rentPrice} </span></h2>
                                    </Paper>

                                    <Paper elevation={0}>
                                        <h2 style={{color: "black"}}>
                                            Available from: <span style={{color: '#e87123'}}>{rentListing.rentListingDetails.availabilityStart.slice(0, 10)} </span>
                                        </h2>
                                    </Paper>

                                    <Paper elevation={0}>
                                        <h2 style={{color: "black"}}>
                                            Available until: <span style={{color: '#e87123'}}>{rentListing.rentListingDetails.availabilityEnd.slice(0, 10)} </span>
                                        </h2>
                                    </Paper>

                                </div>
                                {buyer ? <>
                                    <Button
                                    className="btn"
                                    style={{
                                        borderRadius: 40,
                                        backgroundColor: "#e87123",
                                        padding: "8px 30px",
                                        fontSize: "18px",
                                        color: "#fff",
                                        width: 250,
                                        margin: 'auto',
                                        marginTop: '30px',
                                    }}
                                    href = {'/rentcheckout/' + rentListing._id}
                                    variant="contained"
                                    disableElevation>
                                    Rent </Button>
                                
                                
                                
                                </> : <></>}
                                
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 style={{ color: "black" }}> LOADING </h1>
                    </>
                )}
            </div>
        </rentdetail>
    );
}

export default RentDetail;
