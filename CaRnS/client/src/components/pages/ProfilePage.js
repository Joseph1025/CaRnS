import React from 'react';
import Profile from '../Profile';
import ProfileSideBar from '../ProfileSideBar';

function ProfilePage(){
    return(
        <profilepage>
            <ProfileSideBar />
            <Profile />
        </profilepage>        
    );
}

export default ProfilePage;