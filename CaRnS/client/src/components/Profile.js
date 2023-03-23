import React from "react";
import { useAuth } from "../Utils/AuthContext.js";
import "./Profile.css";
import defaultavatar from "../assets/icons/defaultavatar.png";
import Button from "@mui/material/Button";
import moment from 'moment';

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Profile() {
  const auth = useAuth();  
  return (
    <profile className="profile">
    {	auth.user ?
      
      <>
      <div className="profile-container">
        <text className="page-title">Profile</text>
        <img
          className="profile-avatar"
          style={{ width: 175, height: 175 }}
          src={defaultavatar}
          alt="default avatar"
        ></img>
        <text className="profile-name"> {auth.user.profile.name} </text>
        <div className="profile-info">
          <div className="profile-field">
            <text  className="field-name"> Email Address</text>
            <text className="field-value"> {auth.user.email} </text>
          </div>
          <div className="profile-field">
            <text className="field-name">Phone Number</text>
            <text className="field-value"> {auth.user.profile.phone_number} </text>
          </div>
          <div className="profile-field">
            <text className="field-name"> Account Type</text>
            <text className="field-value"> {Capitalize(auth.user.userType)} </text>
          </div>
          <div className="profile-field">
            <text className="field-name"> Account Created</text>
            <text className="field-value">{moment(auth.user.createdAt).format("MMM DD, YYYY")}</text>
          </div>

          <div className="edit-profile-btn">
            <Button
              className="btn"
              style={{
                borderRadius: 40,
                backgroundColor: "#e87123",
                padding: "8px 30px",
                fontSize: "18px",
                color: "#fff",
                marginLeft: "auto",
                marginRight: "20px",
              }}
              variant="contained"
              disableElevation
              href="/editprofile"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      </>: <><h1 style={{color: 'black'}}> LOADING </h1></>
    }
    </profile>
  );
}

export default Profile;