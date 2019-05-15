const mongoose= require('mongoose');
const Schema=mongoose.Schema;


let DialogPayDetails = new Schema({

    mobile_number: {
        type: String

    },
    nic:{
        type: String
    },

    pay_date:{
        type: String
    },

    amount:{
        type: Number
    },
    email:{
        type: String
    }


});

module.exports= mongoose.model('DialogPayDetails',DialogPayDetails);

