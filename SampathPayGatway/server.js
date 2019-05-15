const express=require('express');//import the express package
const app= express();//new instance of express
const bodyParser= require('body-parser');//import the middle ware
const cors= require('cors');//import the middle ware

const mongoose=require('mongoose');//mongo DB data base

const sampathRoutes= express.Router();//get the access with the end points

const PORT= 4004;//local server will be running using that port to run that API

let SampathPayDetails= require('./sampathPay.model');


const nodemailer = require('nodemailer');//import nodemailer to send emails to booked person

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/trains',{ useNewUrlParser: true });
const connection= mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB DataBase is Established Succefully in SampathPayAPI");

});

//define the endpoints of the URLs
sampathRoutes.route('/').get(function (req, res) {// get is get method and req, res are rewuest and responce objects

    SampathPayDetails.find(function (err, sampathPayDetails) {

        if (err) {

            console.log(err);
        } else {
            res.json(sampathPayDetails);
        }
    });

});



sampathRoutes.route('/add').post(function (req, res) {
    let sampathPayDetails = new SampathPayDetails(req.body);
            console.log("inside the add");
    sampathPayDetails.save()
        .then(sampathPayDetails => {
            emailnotification(sampathPayDetails);

            res.status(200).json({isAdd: true});
        })
        .catch(err => {
            console.log("inside the " +err);
            res.status(400).send('Adding new Sampath Payment failed');
        });

});


//Start Nodemailer------------------------

function emailnotification(sampathPayDetails){

    var output=`<b>Payment Recived</b>
                <p>Dear Sir/Madam, We recieved your payment of ${sampathPayDetails.train_ticket_amount} LKR. 
                Thank you for using Sampath Payments.</p>`; 


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'railwaysbookingrestapi@gmail.com',
            pass: 'ds@2restapi'
        }
    });
    let mailOptions = {
        from: 'railwaysbookingrestapi@gmail.com <Sampath Payments>',
        to:sampathPayDetails.email,
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


app.use('/api/sampathPay', sampathRoutes); //finall setep to get connection
app.listen(PORT, function () {
    console.log("Server is running in PORT : " + PORT);
});

