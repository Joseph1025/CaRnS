import * as React from "react";
import { useRef, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useNotification } from "../Utils/NotificationContext";
import "./VendorRentSingle.css";
import trash from "../assets/icons/trash-icon.png";
import placeholder from "../assets/image/placeholder-image.png";

export default function VendorRentSingle(props) {
  const { listing } = props;
  
  const newPriceRef = useRef(listing.rentListingDetails.rentPrice);
  const newLocationRef = useRef(listing.rentListingDetails.location);
  const newDescriptionRef = useRef(
    listing.rentListingDetails.listingDescription
  );
  const newStartDateRef = useRef((new Date(listing.rentListingDetails.availabilityStart)).toLocaleDateString());
  const newEndDateRef = useRef((new Date(listing.rentListingDetails.availabilityEnd)).toLocaleDateString());
  
  const { _, setNotification } = useNotification();
  
  useEffect(() => {
    newDescriptionRef.current.value =
      listing.rentListingDetails.listingDescription;
    newPriceRef.current.value = listing.rentListingDetails.rentPrice;
    newLocationRef.current.value = listing.rentListingDetails.location;
    
    newStartDateRef.current.value = listing.rentListingDetails.availabilityStart.slice(0,10);
    newEndDateRef.current.value = listing.rentListingDetails.availabilityEnd.slice(0,10);
  }, []);

  const newpost = async (e) => {
    const listingDescription = newDescriptionRef.current.value;
    const salePrice = newPriceRef.current.value;
    const nlocation = newLocationRef.current.value;
    
    const startDate = newStartDateRef.current.value;
    const endDate = newEndDateRef.current.value;
    
    const response = await fetch(
      "http://localhost:8000/api/listing/update-rent/" + listing._id,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newRentPrice: salePrice,
          newListingDescription: listingDescription,
          newLocation: nlocation,
          newStartDate: startDate,
          newEndDate: endDate
        }),
      }
    );
    const status = response.status;
    console.log(status);
    const resData = await response.json();
    console.log(resData);
    if (status === 200) {
      setNotification({
        message: "Listing successfully updated",
        severity: "success",
        open: true,
      });
    } else {
      setNotification({
        message: resData.error,
        severity: "error",
        open: true,
      });
    }
  };
  
  

  const handleDelete = async (e) => {
    const response = await fetch(
      "http://localhost:8000/api/listing/" + listing._id,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const status = response.status;
    console.log(status);
    const resData = await response.json();
    console.log(resData);
    if (status === 200) {
      setNotification({
        message: "Listing successfully deleted",
        severity: "success",
        open: true,
      });
      window.location.reload(false);
    } else {
      setNotification({
        message: resData.error,
        severity: "error",
        open: true,
      });
    }
  };

  return (
    <listingcard>
      <Paper
        elevation={4}
        sx={{ borderRadius: "15px" }}
        className="listing-card"
      >
      <div className="single-left">
      <Typography
            component="h1"
            variant="h5"
            align="left"
            color="text.primary"
            paddingLeft="24px"
            fontFamily="montserrat"
            gutterBottom
          >
            {listing.listingName}
          </Typography>
        <div className="listing-image">
          <img
            className="car-img"
            style={{ width: 150, height: 150, opacity: 0.5 }}
            src={placeholder}
            alt="placeholder"
          ></img>
        </div>

      </div>

        <div className="listing-info">

          <div className="delete-button">
            <img
              title="Delete"
              style={{ width: 25, height: 25 }}
              src={trash}
              alt="delete"
              onClick={handleDelete}
            ></img>
          </div>

          <Typography
            align="left"
            color="text.primary"
            paddingLeft="24px"
            fontFamily="redhat"
            gutterBottom
          >
            Type: {listing.rentListingDetails.vehicleType}
          </Typography>
          <Container>
            <form
              id="vendor-listing-card"
              onSubmit={newpost}
              className="vendor-listing-card"
            >
              <Stack>
                <>Rent Price (/day):</>
                <input required id="input" name="input" ref={newPriceRef} />
                <>Location:</>
                <input required id="input" name="input" ref={newLocationRef} />
                <>Description:</>
                <textarea
                  required
                  id="input"
                  name="input"
                  ref={newDescriptionRef}
                  maxLength="300"
                />
                <>Start Date:</>
                <input required id="input" name="input" ref={newStartDateRef} />
                <>End Date:</>
                <input required id="input" name="input" ref={newEndDateRef} />
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: 5,
                  backgroundColor: "#e87123",
                }}
              >
                Update
              </Button>
            </form>
          </Container>
        </div>
      </Paper>
    </listingcard>
  );
}
