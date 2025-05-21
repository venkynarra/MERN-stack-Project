const express = require('express');

const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);// these are middlewares registering.


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




app.listen(5000);
