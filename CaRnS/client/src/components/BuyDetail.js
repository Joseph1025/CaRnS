import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ContactInfo from "./ContactInfo";
import "./BuyDetail.css";
import placeholder from "../assets/image/placeholder-image.png";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../Utils/AuthContext.js";

function BuyDetail() {
  const [buyListing, setBuyListing] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  let params = useParams();
  let auth = useAuth();
  let buyer = true;
  if (auth.user){
    buyer = (auth.user.userType == 'buyer')
  }
  console.log(buyer);
  useEffect(() => {
    const url =
      "http://localhost:8000/api/listing/view-detail-buy/" + params.listId;
    const fetchBuyDetail = async () => {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBuyListing(data);
      }
    };

    fetchBuyDetail();
  }, []);

  return (
    <buydetail>
      <IconButton size="large" href='/buy' className="backArrow">
        <ArrowBackIcon />
      </IconButton>
      <div className="buydetail">
        {buyListing? (
          <>

            <div className="buydetail-container">
              <div className="buyDetail-left">
                <div className="buylistingimg">
                  <img
                    src={placeholder}
                    style={{ height: 250, width: 250, opacity: 0.5 }}
                  ></img>
                </div>
                <ContactInfo uid={buyListing.vendorID} />
              </div>
              <div className="buyDetail-right">
                <h1 style={{ color: "black", fontSize: 36 }}> {buyListing.listingName} </h1>
                <div className="buyDetail-info">
                  <Paper elevation={0}>
                    <h2 style={{ color: "black" }}> Vehicle Type: </h2>
                    <h3 style={{ color: "black" }}>
                      {buyListing.buyListingDetails.vehicleType}
                    </h3>
                  </Paper>
                  <Paper elevation={0}>
                    <h2 style={{ color: "black" }}> Location: </h2>
                    <h3 style={{ color: "black" }}>
                      {buyListing.buyListingDetails.location}
                    </h3>
                  </Paper>
                  <Paper elevation={0}>
                    <h2 style={{ color: "black" }}> Description: </h2>
                    <h4 style={{ color: "black" }}>
                      {buyListing.buyListingDetails.listingDescription}
                    </h4>
                  </Paper>

                  <Paper elevation={0}>
                    <h2 style={{ color: "black" }}> Price: <span style={{ color: '#e87123' }}>${buyListing.buyListingDetails.salePrice} </span></h2>
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
                      marginTop: '51px',
                    }}
                    href={'/buycheckout/' + buyListing._id}
                    variant="contained"
                    disableElevation>
                    Buy
                  </Button> </> : <> </>}

              </div>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ color: "black" }}> LOADING </h1>
          </>
        )}
      </div>
    </buydetail>
  );
}

export default BuyDetail;
