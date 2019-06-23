const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    //  _id: mongoose.Types.ObjectId,
   
    username: {type: String,unique:true},
   
    location: [
        {
             latitude:{type: String},
             longitude: {type: String},
             time: {type: String},
            
        }
    ]

});
locationModel = mongoose.model('Location', locationSchema);
module.exports = locationModel;