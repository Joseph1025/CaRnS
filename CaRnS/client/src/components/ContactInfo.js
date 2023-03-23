import React from 'react';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';

function ContactInfo(props){
	const { uid } = props;
	const [contactInfo, setContactInfo] = useState(null);
	let params = useParams();
	
	useEffect(() => {
		const url = 'http://localhost:8000/api/user/profile/'+ uid;
		const fetchContactInfo = async () => {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			const data = await response.json()
			
			if (response.ok){
				setContactInfo(data)
			}
			
		}
		
		fetchContactInfo()
	}, [])
	
	return(
		<contactinfo>
		{	contactInfo?
			
			<>
			<Paper elevation={0} 
			sx={{
				fontFamily: 'redhat',
				padding: '15px',
				width: '300px',
				fontSize: 12,}}>
			<h2 style={{color: 'black'}}> Contact Information: </h2>
			<h3 style={{color: 'black'}}> Name: {contactInfo.name}</h3>
			<h3 style={{color: 'black'}}> Phone Number: {contactInfo.phone_number}</h3>
			</Paper>
			</>: <><h1 style={{color: 'black'}}> LOADING </h1></>
		}
		</contactinfo>
	);
}

export default ContactInfo;