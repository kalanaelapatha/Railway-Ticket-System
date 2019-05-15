const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define collections and schema for trains

let Trains = new Schema({

    train_name: {
        type: String
    },
    train_where: {
        type: String
    },
    train_to: {

        type: String
    },

    train_ticket_price: {
        type: Number
    }

}
    , {
        collection: 'trains'
    });


module.exports = mongoose.model('Trains', Trains);