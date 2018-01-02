var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/models');
var guests = mongoose.model("guests");

router.route('/guests').get(function (req, res) {
    guests.find(function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
}).post(function (req, res) {
    guests.create({
        Full_Name: req.body.fullname,
        Email: req.body.emailaddress,
        Phone_Number: req.body.phonenumber,
        Home_Address: req.body.homeaddress,
        Social_Media_Address: req.body.socialmediaaddress,
        done: false
    }, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
    });

router.route('/guests/:id').delete(function (req,res) {
        guests.remove({
            _id: req.params.id
        }, function (err, data) {
            if (err)
                res.send(err);
            // get and return all the todos after you delete one
            guests.find(function (err, data) {
                if (err)
                    res.send(err)
                res.json(data);
            });
        });
});

router.route('/guests/:key/:id').put(function (req,res) {
      guests.findById(req.params.id, function (err, data) {
            if (err)
                res.send(err);
            // update
            data[req.params.key] = req.body.value;
            data.save(function (err, data) {
                if (err)
                    res.send(err)
                res.json({message:'Guest Updated'});
            });
        });
});
module.exports = router;
