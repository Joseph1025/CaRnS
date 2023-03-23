import React from 'react';
import ProfileSideBar from '../ProfileSideBar';
import VendorListingsRent from '../ActiveRentList';

function VendorRentHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <VendorListingsRent/>
        </vendorhistorypage>        
    );
}

export default VendorRentHistoryPage;