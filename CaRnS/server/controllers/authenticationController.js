
const User = require('../models/authenticationModel')
const mongoose = require('mongoose')

// login user
const loginUser = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        req.session.user = user;
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password, userType, profile} = req.body

    try {
        const user = await User.signup(email, password, userType, profile)
        res.status(200).json(user)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

// get user profile
const getProfile = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid user ID'})
    }

    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user.profile)
}

// edit user profile
const editProfile = async (req, res) => {
    const { id } = req.params
    const { newEmail, newName, newPhoneNumber } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid user ID'})
    }

    try {
        const user = await User.findById(id)
        if(newEmail){user.email = newEmail}
        if(newName){user.profile.name = newName}
        if(newPhoneNumber){user.profile.phone_number = newPhoneNumber}

        user.save()
        req.session.user = user
    
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete user account
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid user ID'})
    }

    const user = await User.findOneAndDelete({_id: id})
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user) //might want to return something else
}

const logOut = async (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.status(200).json({ msg: 'user logged out' }).end();
}

const authenticated = async (req, res) => {
    if (!req.session.user) return res.status(401).json({ msg: 'not authenticated' }).end();
    else {
        user =req.session.user;
        res.status(200).json({user}).end();
    }
}


module.exports = {signupUser, loginUser, getProfile, editProfile, deleteUser, logOut, authenticated}