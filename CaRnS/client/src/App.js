import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import BuyListingPage from './components/pages/BuyListingPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import BuyDetail from './components/pages/BuyDetailsPage';
import RentDetail from './components/pages/RentDetailsPage';
import ProfilePage from './components/pages/ProfilePage';
import VendorListingsPage from './components/pages/VendorListingsPage';
import VendorHistoryPage from './components/pages/VendorHistoryPage';
import EditProfilePage from './components/pages/EditProfilePage';
import VendorListingsRent from './components/pages/VendorListingsPageRent';
import BuyerHistoryPage from './components/pages/BuyerHistoryPage';
import BuyCheckoutPage from './components/pages/BuyCheckoutPage';
import RentCheckoutPage from './components/pages/RentCheckoutPage';
import VendorBookingHistoryPage from './components/pages/VendorBookingHistoryPage';
import { useAuth } from "./Utils/AuthContext";
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ListingForm from './components/ListingForm';
import RentListingPage from './components/pages/RentListingPage';

import CreateRentListingPage from './components/pages/CreateRentListingPage';
import RentListingForm from './components/RentListingForm'

function App() {
  let auth = useAuth();
  let navigate  = useNavigate();
  let location = useLocation();
  
  useEffect( () => {
    auth.isauthenticated( (status, data) => {
      if (status !== 200 && location.pathname != "/" && location.pathname != "/buy" 
        && location.pathname != "/rent" && location.pathname != "/signup") {
        navigate("/signin");
      }
      else {
        navigate(location.pathname);
      }
    })
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element ={<SignUpPage/>}/>
        <Route path='/signin' element ={<SignInPage/>}/>
        <Route path='/buy' element={<BuyListingPage/>}/>
        <Route path='/rent' element={<RentListingPage/>}/>
        <Route path='/signup' element ={<SignUpPage/>}/>
        <Route path='/signin' element ={<SignInPage/>}/>
        <Route path='/profile' element ={<ProfilePage/>}/>
        <Route path='/editprofile' element ={<EditProfilePage/>}/>
        <Route path='/listings' element ={<VendorListingsPage/>}/>
        <Route path='/listingrent' element={<VendorListingsRent />} />
        <Route path='/buydetail/:listId' element ={<BuyDetail/>}/>
        <Route path='/createlisting' element={<ListingForm />} />
        <Route path='/createlistingrent' element={<CreateRentListingPage />} />
        <Route path='/listingrent' element={<RentListingForm />} />
        <Route path='/history' element={<VendorHistoryPage />} />
        <Route path='/buyerhistory' element={<BuyerHistoryPage />} />
        <Route path='/buycheckout/:listId' element={<BuyCheckoutPage />} />
        <Route path='/rentcheckout/:listId' element={<RentCheckoutPage />} />
        <Route path='/rentdetail/:listId' element ={<RentDetail/>}/>
        <Route path='/vendorbookinghistory' element={<VendorBookingHistoryPage />} />
      </Routes>
     
    </div>
  );
}
export default App;
