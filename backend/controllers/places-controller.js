
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');


const DUMMY_PLACES = [
    {
        id:'p1',
        title: ' Veritis building',
        description: 'Work building',
        location: {
            lat: 32.8925184,
            lng: -96.976896
        },
        address: '141 Greenway drive',
        creator: 'u1'

    }
];


const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if (!place) {
        throw new HttpError("could not find the place for provided Id!", 404);
        
         
    } 
        res.json({place});
    
    



};

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;

    });if (!place) {
        return next(
         new HttpError("could not find the place for provided User Id!", 404)
        );
    } 
    
    res.json({place});


};


const createPlace = (req, res, next) => {
    const { title, description, address, coordinates, creator}= req.body; //extracting data from incoming request.
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator


    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place: createdPlace});

};
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;