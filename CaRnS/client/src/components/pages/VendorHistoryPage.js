import React from 'react';
import PastSellList from '../PastSellList';
import ProfileSideBar from '../ProfileSideBar';

function VendorHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <PastSellList/>
        </vendorhistorypage>        
    );
}

export default VendorHistoryPage;