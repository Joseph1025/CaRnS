import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useAuth } from "../Utils/AuthContext.js";
import AddIcon from "@mui/icons-material/Add";
import "./ActiveSellList.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import ContactInfo from "./ContactInfo";
import placeholder from "../assets/image/placeholder-image.png";
import { Typography } from "@mui/material";
function VendorBookingTrans() {
  const [rentListing, setRentListings] = useState(null);
  const auth = useAuth();
  useEffect(() => {
    const fetchBuyListings = async () => {
      const response = await fetch(
        "http://localhost:8000/api/listing/view-active-rent/" + auth.user._id,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRentListings(data);
      }
    };

    fetchBuyListings();
  });
  if (!auth.user) {
    console.log(1);
    return <>Loading</>;
  }

  return (
    <>
      <div className="listing-container">
        <div className="page-header">
          <text className="listing-page-title">Booking History</text>

          <Link to={"/history"}>
            <text className="rentToggle">View Sale History</text>
          </Link>
        </div>

        <div className="singlelistings">
          <Stack spacing={3}>
            {rentListing &&
              rentListing.map((rentListing) => (
                <Paper elevation={3} sx={{ padding: "30px" }}>
                  <div className="history-title">
                    <span style={{ fontSize: 24 }}>
                      {rentListing.listingName}
                    </span>
                  </div>
                  <div className="vendor-history-content">
                    <div className="listing-image">
                      <img
                        className="car-img"
                        style={{ width: 150, height: 150, opacity: 0.5 }}
                        src={placeholder}
                        alt="placeholder"
                      ></img>
                    </div>
                    <div className="vendor-history-info">
                      <Typography
                        fontFamily={"redhat"}
                        variant="h5"
                        gutterBottom
                      >
                        Type: {rentListing.rentListingDetails.vehicleType}
                      </Typography>
                      <Typography
                        fontFamily={"redhat"}
                        variant="h5"
                        gutterBottom
                      >
                        Location:{rentListing.rentListingDetails.Location}
                      </Typography>
                      <Typography
                        fontFamily={"redhat"}
                        variant="h5"
                        gutterBottom
                      >
                        Description:
                        {rentListing.rentListingDetails.listingDescription}
                      </Typography>
                      <>
                        {rentListing.rentListingDetails.booking.map(
                          (singleBooking) => (
                            <Container>
                              <Paper
                                elevation={0}
                                sx={{ fontFamily: "redhat" }}
                              >
                                <>Dates Booked:</>
                                <>
                                  {singleBooking.dates.map((date) => (
                                    <Stack spacing={1}>
                                      <>{date.slice(0, 10)}</>
                                    </Stack>
                                  ))}
                                </>
                                <ContactInfo uid={singleBooking.customerID} />
                              </Paper>
                            </Container>
                          )
                        )}
                        <Typography
                          fontFamily={"redhat"}
                          variant="h5"
                          gutterBottom
                        >
                          Price: 
                          <span
                            style={{ color: "#e87123", fontWeight: "bolder" }}
                          >
                            {" "}${rentListing.rentListingDetails.rentPrice}
                          </span>
                        </Typography>
                      </>
                    </div>
                  </div>
                </Paper>
              ))}
          </Stack>
        </div>
      </div>
    </>
  );
}

export default VendorBookingTrans;
