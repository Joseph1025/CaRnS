import React from 'react';
import './Hero.css';
import  logo  from "../assets/icons/carns-logo.png"
import Button from '@mui/material/Button';
import { useAuth } from "../Utils/AuthContext.js";

function Hero(){
    const auth = useAuth();
    return (
        <hero className='hero'>
            <div className='heroContainer'> 
            <img className ='logo' style={{width: 240, height: 180}} src={logo} alt = "carns logo" ></img>
            <h1>The <mark className='orange'>Greatest </mark> Marketplace for Vehicles</h1>

            <Button className ="btn"
            style={{
                borderRadius: 40,
                backgroundColor: "#e87123",
                padding: "15px 55px",
                marginTop: "40px",
                fontSize: "24px",
                color: "#fff"
            }}
            variant="contained" 
            disableElevation 
            href={auth.user ? '/rent' : '/signin'}> 
            Get Started
            </Button>
            </div>
        </hero>
    )
}

export default Hero