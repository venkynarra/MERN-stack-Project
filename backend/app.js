const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*' );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested_With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');


    next();
});
const cors = require('cors');
app.use(cors());


app.use('/api/places', placesRoutes);// these are middlewares registering.

app.use('/api/users', usersRoutes);


app.use((req, res, next) => {
const error = new HttpError("could not find the route", 404);
throw error;


});


app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'AN unknown error occured!'})
});


mongoose.connect('mongodb+srv://mern1:mern234@cluster0.bhbfxpw.mongodb.net/MERN?retryWrites=true&w=majority&appName=Cluster0').then(()=> {
    app.listen(5000);

}).catch(err => {
    console.log(err);
});


