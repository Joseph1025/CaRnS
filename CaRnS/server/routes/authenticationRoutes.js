const express = require('express')

const router = express.Router()

//controller functions
const { signupUser, loginUser, getProfile, editProfile, deleteUser, logOut, authenticated } = require('../controllers/authenticationController')

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/logout', logOut)

router.get('/profile/:id', getProfile)

router.get('/authenticated', authenticated)

router.put('/profile/:id', editProfile)

router.delete('/:id', deleteUser)



module.exports = router;
