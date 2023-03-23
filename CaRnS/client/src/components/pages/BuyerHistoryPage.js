import React from 'react';
import ProfileSideBar from '../ProfileSideBar';
import BuyerHistory from '../BuyHistory';

function BuyerHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <BuyerHistory/>
        </vendorhistorypage>        
    );
}

export default BuyerHistoryPage;