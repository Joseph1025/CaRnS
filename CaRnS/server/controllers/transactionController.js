const Transaction = require('../models/TransactionModel')
const Listing = require('../models/listingModel')

const mongoose = require('mongoose')


const logTransaction = async (req, res) => {


    const { customerID, listingID, bookingStartDate, bookingEndDate } = req.body

   
    const listing = await Listing.findById(listingID)
    
    let transaction;

    try {
        if(listing.isBuy == true) {
            transaction = await Transaction.log(customerID, listingID)
        } else {     
            transaction = await Transaction.log(customerID, listingID, bookingStartDate, bookingEndDate)

        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
    
}


const getPastPurchases = async (req, res) => {
    const id = req.session.user._id;
    const listing_transactions = await Transaction.find({ customerID: id }, { _id: 0, listingID: 1 }).sort({ createdAt: 1 })

    const listing_array = []

    for (var i = 0; i < listing_transactions.length; i++) {
        if (!listing_array.includes(listing_transactions[i].listingID)){
            listing_array.push(listing_transactions[i].listingID)
        }
    }

    const listings = await Listing.find({_id: {$in: listing_array} } ).sort({updatedAt:-1})


    res.status(200).json(listings)
}

module.exports = { logTransaction, getPastPurchases }

