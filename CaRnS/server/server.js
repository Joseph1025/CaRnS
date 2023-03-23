const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');

const authenticationRoutes = require('./routes/authenticationRoutes')
const listingRoutes = require('./routes/listingRoutes')
const transactionRoutes = require('./routes/transactionRoutes')


const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));

app.use(express.json());
app.use(session({
    secret: "cscc01FinalProjectCARNS",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false,
        SameSite: 'None',
        maxAge: 1000 * 60 * 60  // 1 hour
    }
}));
app.use('/api/user', authenticationRoutes)
app.use('/api/listing', listingRoutes)
app.use('/api/transaction', transactionRoutes)



const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => {

        //listen for requests
        app.listen(port, () => {
            console.log(`Connected to DB & server is running on port: ${port}`);
        });

        
    });
const connection = mongoose.connection;
