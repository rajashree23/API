const express = require('express');
const router = express.Router();
const locationController = require('../controller/location.js');
var loc=require('../models/location.js');

router.get('/', (req, res, next) => {
    
    loc.find((function(err, data) {
        res.send(data);
    }));
    
    
});

router.post('/latlng', locationController.locationcreate);


module.exports = router;