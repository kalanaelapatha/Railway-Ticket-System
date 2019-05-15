const express = require('express');//import the express packege
const app = express();//new instance of express
const bodyParser = require('body-parser');//import the middle ware
const cors = require('cors');//import the middle ware

const mongoose = require('mongoose');

const dialogRoutes = express.Router();//get access with the endpoints of express server

const PORT = 4002; //local server will be running using that port

let DialogPayDetails = require('./dialogPay.model');//import the schema

app.use(cors());//using that instance we passed the middleware
app.use(bodyParser.json());


const nodemailer = require('nodemailer');//import nodemailer to send emails to booked person
mongoose.connect('mongodb://127.0.0.1:27017/trains', { useNewUrlParser: true }); //connect to MongoDb Data Base
const connection = mongoose.connection;//create a object of moongoos to connect

connection.once('open', function () {
    console.log("MongoDb Database is established succefully in DialogPayAPI");
});
//define the endpoints of the URls

dialogRoutes.route('/').get(function (_req, res) {// get is get method and req, res are rewuest and responce objects

    DialogPayDetails.find(function (err, dialogPaydetails) {

        if (err) {

            console.log(err);
        } else {
            res.json(dialogPaydetails);
        }
    });

});



dialogRoutes.route('/add').post(function (req, res) {
    let dialogPayDetails = new DialogPayDetails(req.body);

    dialogPayDetails.save()
        .then(dialogPayDetails => {
            emailnotification(dialogPayDetails);
            res.status(200).json({ isAdd: true });
        })
        .catch(err => {
            res.status(400).send('Adding new Dialog mobile Payment failed');
        });

});



//Start Nodemailer------------------------

function emailnotification(dialogPayDetails){

    var output=`<b>Payment Recived</b>
                <p>Dear Sir/Madam, We recieved your payment of ${dialogPayDetails.total} LKR. 
                Thank you for using Dialog Payments.</p>`; 


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'railwayticket0000@gmail.com',
            pass: 'ams@1996'
        }
    });
    let mailOptions = {
        from: 'railwayTicketBooking@gmail.com <Dialog Payments>',
        to:dialogPayDetails.email,
        subject: 'Ticket Confirmation',
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}



//End the Nodemailer----------------------

app.use('/api/dialogPay', dialogRoutes); //finall setep to get connection
app.listen(PORT, function () {
    console.log("Server is running in PORT : " + PORT);
});


