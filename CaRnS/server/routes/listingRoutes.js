const express = require('express')

const router = express.Router()

//controller functions
const { postBuyListing, postRentListing, viewBuyListings, viewExpiredRentListings, viewRentListings, updateBuyListing, updateRentListing, deleteListing, getdetailbuy, getDetailRent, addRentListingDates, removeRentListingDates, viewActiveBuyListings, viewPastBuyListings, viewActiveRentListings } = require('../controllers/listingController')

router.post('/post-buy', postBuyListing)
router.post('/post-rent', postRentListing)


router.get('/view-buy', viewBuyListings)
router.get('/view-rent', viewRentListings)
router.get('/view-rent-expired', viewExpiredRentListings)
router.get('/view-detail-buy/:id', getdetailbuy)
router.get('/view-detail-rent/:id', getDetailRent)
router.get('/view-active-buy/:id', viewActiveBuyListings)
router.get('/view-past-buy/:id', viewPastBuyListings)
router.get('/view-active-rent/:id', viewActiveRentListings)


router.put('/update-buy/:id', updateBuyListing)
router.put('/update-rent/:id', updateRentListing)

router.put('/add-dates/:id', addRentListingDates)
router.put('/remove-dates/:id', removeRentListingDates)


router.delete('/:id', deleteListing)

module.exports = router;
