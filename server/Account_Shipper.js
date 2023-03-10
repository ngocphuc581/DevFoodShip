const mongoose = require('mongoose');
const Account_Shipper = mongoose.Schema({
    password : String,
    fullName : String,
    phone : String,
    email : String,
    state : Boolean,
    currentLatitude : Number,
    currentLongtitude : Number,
})
mongoose.model('Account_Shipper', Account_Shipper);