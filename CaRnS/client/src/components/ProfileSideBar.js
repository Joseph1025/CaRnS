import React from "react";
import "../App.css";
import "./ProfileSideBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext.js";

function ProfileSideBar() {
  const auth = useAuth();
  if (!auth.user){
    return (
      <></>
    )
  }
  if (auth.user.userType === "vendor") {
    return (
      <sidebar className="sidebar">
        <div className="sidebar-container">
          <ul>
            <li>
              <Link to="/profile">
                Account
              </Link>
            </li>
            <li>
              <Link to="/listings">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/history">
                History
              </Link>
            </li>
          </ul>
        </div>
      </sidebar>
    );
  }else{
  return (
    <sidebar className="sidebar">
      <div className="sidebar-container">
        <ul>
          <li>
            <Link to="/profile">
              Account
            </Link>
          </li>
          <li>
            <Link to="/buyerhistory">
              History
            </Link>
          </li>
        </ul>
      </div>
    </sidebar>
  );
}
}

export default ProfileSideBar;
