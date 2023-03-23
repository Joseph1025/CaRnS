import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useAuth } from "../Utils/AuthContext.js";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import ContactInfo from "./ContactInfo";
import "./BuyHistory.css";
import { Typography } from "@mui/material";
import placeholder from "../assets/image/placeholder-image.png";
function BuyerHistory() {
  const [listing, setListings] = useState(null);
  const auth = useAuth();
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        "http://localhost:8000/api/transaction/past-purchases",
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setListings(data);
      }
    };

    fetchListings();
  }, [true]);
  if (!auth.user) {
    console.log(1);
    return <>Loading</>;
  }

  return (
    <>
      <div className="history-container">
        <div className="page-header">
          <text className="listing-page-title">History</text>
        </div>

        <div className="history-listing">
          <Stack spacing={3}>
            {listing &&
              auth.user &&
              listing.map((listing) => (
                <Container>
                  <Paper elevation={3} className="history-card">

                    <div className="history-title">
                      <span style={{ fontSize: 24 }}>
                        {listing.listingName}
                      </span>
                    </div>
                    <div className="history-content"> 
                    <div className="listing-image">
                      <img
                        className="car-img"
                        style={{ width: 150, height: 150, opacity: 0.5 }}
                        src={placeholder}
                        alt="placeholder"
                      ></img>
                    </div>
                    <div className="history-info"> 
                    <div className="history-type">{listing.isBuy ? <>Type: Buy</> : <>Type: Rent</>} </div>
                    <>
                      {listing.isBuy ? (
                        <></>
                      ) : (
                        <Container>
                          Dates booked:
                          {listing.rentListingDetails.booking.map((booking) => (
                            <>
                              {booking.customerID === auth.user._id ? (
                                <>
                                  {booking.dates.map((date) => (
                                    <Stack spacing={1}>
                                      <>{date.slice(0, 10)}</>
                                    </Stack>
                                  ))}
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ))}
                        </Container>
                      )}
                    </>

                    <ContactInfo uid={listing.vendorID} />
                    <div className="history-price">
                      <>
                        {listing.isBuy ? (
                          <>
                            <Typography sx={{ fontSize: 24 }}>
                              Sale Price:
                              <span
                                style={{
                                  color: "#e87123",
                                  fontWeight: "bolder",
                                }}
                              >
                                ${listing.buyListingDetails.salePrice}
                              </span>
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={{ fontSize: 24 }}>
                              Rent Price: 
                              <span
                                style={{
                                  color: "#e87123",
                                  fontWeight: "bolder",
                                }}
                              >
                                ${listing.rentListingDetails.rentPrice}
                              </span> /day
                            </Typography>
                          </>
                        )}
                      </>
                    </div>
                    </div>
                    </div>
                  </Paper>
                </Container>
              ))}
          </Stack>
        </div>
      </div>
    </>
  );
}

export default BuyerHistory;
