import React from 'react';
import ProfileSideBar from '../ProfileSideBar';
import ActiveSellList from '../ActiveSellList';

function VendorListingsPage(){
    return(
        <vendorlistingpage>
            <ProfileSideBar />
            <ActiveSellList/>
        </vendorlistingpage>        
    );
}

export default VendorListingsPage;