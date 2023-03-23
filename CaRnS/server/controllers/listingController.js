const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

// post buy listing
const postBuyListing = async (req, res) => {
    const { listingName, isBuy ,buyListingDetails } = req.body

    try {
        const listing = await Listing.listBuy(req.session.user._id, listingName, isBuy, buyListingDetails)
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//post rent listing
const postRentListing = async (req, res) => {
    const { listingName, isBuy, rentListingDetails } = req.body

    try {
        const listing = await Listing.listRent(req.session.user._id, listingName, isBuy, rentListingDetails)
        res.status(200).json(listing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// view buy listings
const viewBuyListings = async (req, res) => {
    const listings = await Listing.find({ isBuy: true, 'buyListingDetails.isActive': true }).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

const viewActiveBuyListings = async (req, res) => {
    const { id } = req.params
    const listings = await Listing.find({ isBuy: true, vendorID: id, 'buyListingDetails.isActive': true }).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

const viewPastBuyListings = async (req, res) => {
    const { id } = req.params
    const listings = await Listing.find({ isBuy: true, vendorID: id, 'buyListingDetails.isActive': false }).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

// view non-expired/avaliable rent listings
const viewRentListings = async (req, res) => {
    const today = new Date()
    //$gte -> greater than or equal to
    const listings = await Listing.find({ isBuy: false, "rentListingDetails.availabilityEnd": { $gte: today }} ).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

// view expired rent listings
const viewExpiredRentListings = async (req, res) => {
    const today = new Date()
    //$lt -> less than
    const listings = await Listing.find({ isBuy: false, "rentListingDetails.availabilityEnd": { $lt: today }} ).sort({ createdAt: -1 })
    res.status(200).json(listings)
}

const viewActiveRentListings = async (req, res) => {
    const { id } = req.params
    const listings = await Listing.find({ isBuy: false, vendorID: id }).sort({ createdAt: -1 })
    res.status(200).json(listings)
}


const updateBuyListing = async (req, res) => {
    const { id } = req.params
    const { newListingDescription, newSalePrice, newLocation } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    if (!newSalePrice) {
        return res.status(400).json({ error: 'Enter a new sale price' })
    }  

    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (listing.isBuy == false){
        return res.status(400).json({ error: 'Not a buy listing' })
    }

    if (newListingDescription) { listing.buyListingDetails.listingDescription = newListingDescription }
    if (newSalePrice) { listing.buyListingDetails.salePrice = newSalePrice }
    if (newLocation) { listing.buyListingDetails.location = newLocation }

    listing.save()

    res.status(200).json(listing)
}

const updateRentListing = async (req, res) => {
    const { id }  = req.params
    const { newListingDescription, newRentPrice, newLocation } = req.body
    let { newStartDate, newEndDate } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }

    if (!newRentPrice && !newStartDate && !newEndDate && !newLocation){
        return res.status(400).json({ error: 'Enter updated information' })
    }
    if (listing.isBuy == true) {
        return res.status(400).json({ error: 'Not a rent listing' })
    }

    try {
        if(newStartDate) {newStartDate = new Date(newStartDate)}
        if(newEndDate) {newEndDate = new Date(newEndDate)}
    } catch (error) {
        return res.status(400).json({ error: 'Not a valid date input' })
    }
    
    if (newListingDescription) { listing.rentListingDetails.listingDescription = newListingDescription}
    if (newRentPrice){ listing.rentListingDetails.rentPrice = newRentPrice }
    if (newStartDate) {
        if(newStartDate < listing.rentListingDetails.availabilityEnd) {
            listing.rentListingDetails.availabilityStart = newStartDate
        } else {
            return res.status(400).json({ error: 'Invalid new start date' })
        }            
    }
    if (newEndDate) { 
        if(newEndDate > listing.rentListingDetails.availabilityStart) {
            listing.rentListingDetails.availabilityEnd = newEndDate
        } else {
            return res.status(400).json({ error: 'Invalid new end date' })
        }   
         
    }
    if (newLocation) { listing.rentListingDetails.location = newLocation }
    
    listing.save()

    res.status(200).json(listing)
}

const deleteListing = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid listing ID'})
    }

    const listing = await Listing.findOneAndDelete({_id: id})
    if (!listing) {
        return res.status(404).json({error: 'No such listing'})
    }
    if(!listing.isBuy) {
        if(listing.rentListingDetails.allUnavailableDates.length != 0) {
            return res.status(400).json({error: 'Cannot remove the listing while it is being rented'})
        }
    }

    res.status(200).json(listing)
}

const getdetailbuy = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    
    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (!listing.buyListingDetails) {
        return res.status(404).json({ error: 'Missing details' })
    }
    
    
    
    res.status(200).json(listing)
}

const getDetailRent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }

    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (!listing.rentListingDetails) {
        return res.status(404).json({ error: 'Missing details' })
    }
    
    res.status(200).json(listing)
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

const addRentListingDates = async (req, res) => {
    const { id } = req.params
    const { bookingStartDate, bookingEndDate } = req.body

    if(req.session.user == null) {
        return res.status(400).json({ error: 'User not logged in' })
    }
    const customerID = req.session.user._id


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    
    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (listing.isBuy == true) {
        return res.status(400).json({ error: 'Not a rent listing' })
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
                return res.status(400).json({error: 'Date is already taken' })
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

            return res.status(200).json(listing.rentListingDetails)
        } catch(error) {
            return res.status(404).json({error: 'Error updating dates'})
        }
    } else {
        return res.status(400).json({error: 'Invalid booking date'})
    }
} 

function removeDates(dates, datesToRemove) {
    return dates.filter(function(date) {
        if(!isInArray(datesToRemove, date)) {
            return date
        }
    })
}

const removeRentListingDates = async (req, res) => {
    const { id } = req.params
    const { bookingStartDate, bookingEndDate } = req.body

    if(req.session.user == null) {
        return res.status(400).json({ error: 'User not logged in' })
    }
    const customerID = req.session.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not a valid listing ID' })
    }
    
    const listing = await Listing.findById(id)
    if (!listing) {
        return res.status(404).json({ error: 'No such listing' })
    }
    if (listing.isBuy == true) {
        return res.status(400).json({ error: 'Not a rent listing' })
    }

   
    // let rentDates = req.body.dates.map(dateString => new Date(dateString)).sort((a,b)=>a.getTime()-b.getTime())
    let rentDates = toDateArray(bookingStartDate, bookingEndDate)

    if(rentDates.length == 0) {
        return res.status(400).json({error: 'Invalid booking date'})
    }

    try {
        //Create and update booking object
        //Find if the customerID exists already in the booking object
        if(listing.rentListingDetails.booking.find(booking => booking.customerID === customerID) != null) {
            // Update allUnavaliableDates and booking dates
            booking = listing.rentListingDetails.booking.find(booking => booking.customerID === customerID)
            
            for(let i = 0; i < rentDates.length; i++) {
                if(!isInArray(booking.dates, rentDates[i])) {
                    return res.status(400).json({error: 'Cannot remove non-booked dates' })
                }
            }

            listing.rentListingDetails.allUnavailableDates = removeDates(listing.rentListingDetails.allUnavailableDates, rentDates)
            booking.dates = removeDates(booking.dates, rentDates)
            bookingIndex = listing.rentListingDetails.booking.findIndex(booking => booking.customerID === customerID) //Used for resulting array check
            

            // Check if booking dates for the user is empty and if it is then delete the user's booking object (clutter removal)
            if(booking.dates.length == 0) {
               listing.rentListingDetails.booking.splice(bookingIndex, 1) 
            }
        } else {
            return res.status(400).json({ error: 'Customer has no dates to remove' })
        }
        

        listing.save()

        return res.status(200).json(listing.rentListingDetails)
    } catch(error) {
        return res.status(404).json({error: 'Error updating dates'})
    }
} 


module.exports = { postBuyListing, postRentListing, viewBuyListings, viewExpiredRentListings, viewRentListings, updateBuyListing, updateRentListing, deleteListing, getdetailbuy, getDetailRent, addRentListingDates, removeRentListingDates, viewActiveBuyListings, viewPastBuyListings, viewActiveRentListings }

