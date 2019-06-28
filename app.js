const express = require('express');
const app = express();
const morgan = require('morgan');
const body = require('body-parser');

const mongoose = require('mongoose');
const userRoutes = require('./api/routes/users');
const locationRoutes = require('./api/routes/location');


mongoose.connect('mongodb://localhost:27017/tracking');
// mongoose.connect(
//     "mongodb+srv://rajashree:" +process.env.MONGO_ATLAS_PW + "@node-servers-welef.mongodb.net/test?retryWrites=true&w=majority" ,{
//         useNewUrlParser:true
//     });
mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use(body.urlencoded({ extended: true }));
app.use(body.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


//Routes which should handle requests
app.use('/users', userRoutes);
app.use('/location', locationRoutes);


app.use((req, res, next) => {
    console.error('not found');
    error.status = 404;
    next(error);

})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;