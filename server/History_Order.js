const mongoose = require('mongoose');
const date = new Date();
var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
const History_Order = mongoose.Schema({
    id_Payment : String,
    id_Shipper : String,
    createdAt : {
        type : Date,
        default : newDate,
    }
})
mongoose.model('History_Order', History_Order);