import React from 'react'
import { Grid, Paper, TextField, Button, Typography, Link } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {useAuth} from '../Utils/AuthContext.js'
import { useNotification } from '../Utils/NotificationContext';
import { useNavigate } from 'react-router-dom';
import  logo  from "../assets/icons/carns-logo.png";
import './SignIn.css';

const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
// const btnstyle = { margin: '8px 0' }
const initialValues = { 
    username: '',
    password: '',
}
const validationSchema = Yup.object().shape({
    username: Yup.string().email('please enter valid email').required("Required"),
    password: Yup.string().required("Required")
})
/*
const onSubmit = (values, props) => {
    
    console.log(values)
    setTimeout(() => {
        props.resetForm()
        props.setSubmitting(false)
    }, 2000)
    
}
*/

function SignIn({ handleChange }){
    const { _, setNotification } = useNotification();
    const auth = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        
        auth.login( { email: data.username, password: data.password }, (status, data) => {
            if (status === 200){
                
                navigate('/profile');
            }
            else {
                setNotification({
                    message:data.error,
                    severity: "error",
                    open: true
                });
            }
        });
    };

    return(  <Grid className='signinForm-container'>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <img style={{width: 80, height: 60}} src={logo} alt = "carns logo" ></img>
                <h2>Sign In</h2>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field as={TextField} label='Username' name="username"
                            placeholder='Enter username' fullWidth required
                            helperText={<ErrorMessage name="username" />}
                        />
                        <Field as={TextField} label='Password' name="password"
                            placeholder='Enter password' type='password' fullWidth required
                            helperText={<ErrorMessage name="password" />} />
                        <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                            style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40, marginTop : 10}} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                    </Form>
                )}
            </Formik>
           
            <Typography > Already have an account?
                 <Link href="signup" onClick={() => handleChange("event", 1)} >
                    Sign Up
                </Link>
            </Typography>
        </Paper>
    </Grid>
);
}

export default SignIn;