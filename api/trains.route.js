const express = require('express');
const trainsRoutes = express.Router();
// Require Business model in our routes module

let Trains = require('./trains.model');

// Defined store route
trainsRoutes.route('/add').post(function (req, res) {
    let trains = new Trains(req.body);
    trains.save()
        .then(trains => {
            res.status(200).json({ 'trains': 'Train Ticket booked successfully' });
        })
        .catch(err => {
            res.status(400).send("Unable to book a tickets");
        });
});

// Defined get data(index or listing) route
trainsRoutes.route('/').get(function (req, res) {
    Trains.find(function (err, trains) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(trains);
        }
    });




});

// Defined edit route
trainsRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Trains.findById(id, function (err, trains) {
        res.json(trains);
    });
});

//  Defined update route
trainsRoutes.route('/update/:id').post(function (req, res) {
    Trains.findById(req.params.id, function (err, trains) {
        if (!trains)
            res.status(404).send("Ticket lot is not found");
        else {
            trains.train_name = req.body.train_name;
            trains.train_where = req.body.train_where;
            trains.train_to = req.body.train_to;
            trains.train_ticket_price = req.body.train_ticket_price;
            trains.train_ticket_quantity = req.body.train_ticket_quantity;

            trains.save().then(trains => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
trainsRoutes.route('/delete/:id').get(function (req, res) {
    Trains.findByIdAndRemove({ _id: req.params.id }, function (err, trains) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});


module.exports = trainsRoutes;