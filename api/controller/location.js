const body = require('body-parser');
const locationmodel = require('../models/location.js');
const mongoose = require('mongoose');

exports.locationcreate = (req, res, next) => {
    var locationtime = new Date();
    var locationModel = new locationmodel({


        username: req.body.username,
        location: [
            {


                //incase you need time for other timezone:

                // time: locationtime.toLocaleString('en-US', { timeZone: "America/Los_Angeles" }),
                // time: locationtime.toLocaleString('en-US', { timeZone: "Asia/Shanghai" }),
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                
                time: locationtime.toLocaleString('en-US', { timeZone: "Asia/Kolkata" })
            }
        ]
    });



    locationmodel.findOne({ "username": req.body.username }, function (err, doc) {
        if (doc == null) {

            locationModel.save().then(result => {
                console.log(result);
                res.status(201).json({
                    message: "location created"
                });

            });

        }
        else {

            var locationtime = new Date();
            var time = locationtime.toLocaleString('en-US', { timeZone: "Asia/Kolkata" });
            locationmodel.findOneAndUpdate({ "username": req.body.username },

                {
                    "$push": {
                        "location": {
                            "latitude": req.body.latitude,
                            "longitude": req.body.longitude,
                            "time": time,
                            
                        }
                    }


                }, function (err, doc) {
                    if (!err) {
                        res.status(200).json({
                            messsage: "loc updated"
                        });
                    }
                    else {
                        res.status(500);
                    }
                });

        }
    });
}





