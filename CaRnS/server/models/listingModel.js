const mongoose = require('mongoose')
const moment = require('moment')

const User = require('../models/authenticationModel')


const Schema = mongoose.Schema

const buyListingDetails = new Schema ({
    listingDescription: String,
    vehicleType: {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    }
})

const rentListingDetails = new Schema ({
    listingDescription: String,  
    vehicleType: {
        type: String,
        required: true
    },
    rentPrice:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required:true
    },
    availabilityStart:{
        type: Date,
        required: true
    },
    availabilityEnd:{
        type: Date,
        required: true
    },
    allUnavailableDates: [{type: Date}],
    booking: [{ customerID: String, dates: [{type: Date}]}]
})

const listingSchema = new Schema({
    vendorID: {
        type: String,
        required: true,
    },
    listingName: {
        type: String,
        required: true
    },
    isBuy:{
        type: Boolean,
        required: true
    },
    buyListingDetails: {
        type: buyListingDetails,
    },
    rentListingDetails:{
        type: rentListingDetails
    }

}, { timestamps: true })


listingSchema.statics.listBuy = async function (vendorID, listingName, isBuy, buyListingDetails) {

    // validation
    if (!vendorID || !listingName || !isBuy || !buyListingDetails) {
      throw Error('Buy - All fields must be filled')
    }


    if (!buyListingDetails.vehicleType || !buyListingDetails.salePrice || !buyListingDetails.location) {
        throw Error('Buy - All fields must be filled')
    }

    if(!isBuy) {
        throw Error('isBuy must be true for a buy listing')
    }

    // create listing
    const listing = await this.create({ vendorID, listingName, isBuy, buyListingDetails })
    return listing
   
}

listingSchema.statics.listRent = async function (vendorID, listingName, isBuy, rentListingDetails) {
    // validation

    if (!vendorID || !listingName || isBuy==undefined || !rentListingDetails) {
        throw Error('Rent - All fields must be filled')
    }


    if (!rentListingDetails.vehicleType || !rentListingDetails.rentPrice || !rentListingDetails.availabilityStart || !rentListingDetails.availabilityEnd || !rentListingDetails.location) {
        throw Error('Rent - All fields must be filled')
    }

    if(isBuy) {
        throw Error('isBuy must be false for a rent listing')
    }

    if (!moment(rentListingDetails.availabilityStart, "YYYY-MM-DD", true).isValid()) {
        throw Error('Invalid start date')

    }
    if (!moment(rentListingDetails.availabilityEnd, "YYYY-MM-DD", true).isValid()) {
        throw Error('Invalid end date')

    }

    if (Date.parse(rentListingDetails.availabilityStart) > Date.parse(rentListingDetails.availabilityEnd)) {
        throw Error('End date must be after the start date')
    }

    

    rentListingDetails = {...rentListingDetails, "booking": [], "allUnavailableDates": []} //This line is merely for asethic purposes in the db

    // create listing
    try {
        const listing = await this.create({ vendorID, listingName, isBuy, rentListingDetails })
        return listing

    } catch (error) {
        throw Error('Failed to add to database')
    }

}

//Check if date is in array
function isInArray(array, value) {
    return !!array.find(item => {return item.getTime() == value.getTime()})
}

//Convert start and end dates to an array of dates
function toDateArray(startDate, endDate) {
    let dateArray = []
    let date = new Date(startDate)
    let end = new Date(endDate)

    while (date <= end) {
        dateArray.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return dateArray
}

listingSchema.statics.addRentListingDates = async function (customerID, listingID, bookingStartDate, bookingEndDate) {
    
    if (!mongoose.Types.ObjectId.isValid(listingID)) {
        throw Error('Not a valid listing')
    }
    
    const listing = await this.findById(listingID)
    if (!listing) {
        throw Error('No such listing')
    }
    if (listing.isBuy == true) {
        throw Error('Not a rent listing')
    }

    const startDate = listing.rentListingDetails.availabilityStart
    const endDate = listing.rentListingDetails.availabilityEnd

    //let rentDates = req.body.dates.map(dateString => new Date(dateString)).sort((a,b)=>a.getTime()-b.getTime())
    let rentDates =  toDateArray(bookingStartDate, bookingEndDate)
    let bookingDates = rentDates //Save original booking dates

    //Check if dates are between bounds
    if(rentDates[0] >= startDate && rentDates[rentDates.length - 1] < endDate && rentDates.length > 0) {
        //Check if date is taken
        for(let i = 0; i < rentDates.length; i++) {
            if(isInArray(listing.rentListingDetails.allUnavailableDates, rentDates[i])) {
                throw Error('Date is already taken')  
            }
        }

        try {
            //Merge date lists and update allUnavailableDates
            rentDates = rentDates.concat(listing.rentListingDetails.allUnavailableDates)
            rentDates.sort((a,b)=>a.getTime()-b.getTime())
            listing.rentListingDetails.allUnavailableDates = rentDates

            //Create and update booking object
            //Find if the customerID exists already in the booking object
            if(listing.rentListingDetails.booking.find(booking => booking.customerID === customerID) != null) {
                //If it does, update the respective customer's booking object (and sort it)
                booking = listing.rentListingDetails.booking.find(booking => booking.customerID === customerID)
                booking.dates = booking.dates.concat(bookingDates).sort((a,b)=>a.getTime()-b.getTime())
            } else {
                //If it doesn't, then just create a booking object for the customer
                listing.rentListingDetails.booking.push({ "customerID": customerID, "dates": bookingDates })
            }

            listing.save()

            return listing
            
        } catch(error) {
            throw Error('Error updating dates')
        }
    } else {
        throw Error('Invalid booking date')
    }
}


module.exports = mongoose.model('Listing', listingSchema)