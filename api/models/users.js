const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    //  _id: mongoose.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
});
userModel = mongoose.model('User', userSchema);
module.exports = userModel;