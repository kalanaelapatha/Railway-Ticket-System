const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SampathPayDetails = new Schema({

    card_number: {
        type: Number
    },
    card_name: {
        type: String
    },
    card_cvv: {
        type: Number
    },
    card_exp: {
        type: String
    },
    train_ticket_amount:{
        type: Number
    },
    email:{
        type: String
    }



});

module.exports= mongoose.model('SampathPayDetails',SampathPayDetails);