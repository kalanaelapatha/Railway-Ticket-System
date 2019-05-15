const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
//import the MongoDb
const mongoose = require('mongoose');
const config = require('./DB.js');

const trainsRoute = require('./trains.route');



mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true })
    .then(() => { console.log('DataBse is connected') },
        err => { console.log('Can not connect to the Databse' + err) }
    );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/trains', trainsRoute);


app.listen(PORT, function () {
    console.log('Server is Running on PORT : ', PORT);
});