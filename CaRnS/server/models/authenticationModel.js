const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: {
        type: String
    },
    phone_number: {
        type: String
    }
})

const authenticationSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    profile: {
        type: profileSchema,
        required: true
    }
 }, {timestamps: true})

// static signup method
authenticationSchema.statics.signup = async function(email, password, userType, profile) {
    // validation
    if (!email || !password || !userType || !profile || !profile.name || !profile.phone_number) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    if (userType != "vendor" && userType != "buyer"){
        throw Error('Invalid user type')
    }

    // checking if user exists
    const exists = await this.findOne({ email })
    if (exists){
        throw Error('Email already in use')
    }

    // create user
    const user = await this.create({ email, password, userType, profile})
    return user
}

// static signup method
authenticationSchema.statics.login = async function(email, password){
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    if (password != user.password){
        throw Error('Incorrect password')
    }

    return user
}

 module.exports = mongoose.model('User', authenticationSchema)
 