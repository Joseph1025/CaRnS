import React from "react";
import { Link } from "react-router-dom";
import "./ActiveSellList.css";
import ActiveHistorySingle from "./ActiveHistorySingle";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useAuth } from "../Utils/AuthContext.js";
import AddIcon from "@mui/icons-material/Add";

function ActiveSellList() {
  const [buyListing, setBuyListings] = useState(null);
  const auth = useAuth();
  useEffect(() => {
    const fetchBuyListings = async () => {
      const response = await fetch(
        "http://localhost:8000/api/listing/view-active-buy/" +
          auth.user._id,
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
        setBuyListings(data);
      }
    };

    fetchBuyListings();
  });
  if (!auth.user) {
    console.log(1);
    return <>Loading</>;
  }

  return (
    <activeselllist>
      <div className="listing-container">
        <div className="page-header">
          <text className="listing-page-title">
            Active Sell Listings
          </text>

          <Link to={"/listingrent"}>
            <text className="rentToggle">
            View Active Rent Listings
            </text> 
          </Link>
        </div>

        <Link to={"/createlisting"}>
          <div className="newListing">
            <AddIcon
              sx={{ fontSize: 50, marginTop: "20px", marginLeft: "47.5%" }}
            />
            New Sell Listing
          </div>
        </Link>

        <div className="singlelistings">
          <Stack spacing={3}>
            {buyListing &&
              buyListing.map((buyListing) => (
                <ActiveHistorySingle listing={buyListing} />
              ))}
          </Stack>
        </div>
      </div>
    </activeselllist>
  );
}

export default ActiveSellList;
