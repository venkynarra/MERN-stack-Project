
const { v4: uuidv4 } = require('uuid');

const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place')


let DUMMY_PLACES = [
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


const getPlaceById =async (req, res, next) => {
    const placeId = req.params.pid;
let place;
    try{
        place =  await Place.findById(placeId); //mongoose
    }catch (err){
        const error = new HttpError(
            'could not find the place something went wrong', 500
        );

        return next(error);
    }

    if (!place) {
        const error = new HttpError("could not find the place for provided Id!", 404);
        return next(error);
        
         
    } 
        res.json({place: place.toObject({getters: true})}); 
    
    



};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;

    });if (!places || places.length === 0) {
        return next(
         new HttpError("could not find the places for provided User Id!", 404)
        );
    } 
    
    res.json({places});


};



const createPlace = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        return next( new HttpError('invalid inputs passwed please check your data', 422));
        
    }
    const { title, description, address, creator}= req.body;

    let coordinates;
    try{
        coordinates = await getCoordsForAddress(address);
    } catch(error){
        return next(error);
    }
    
    
    const createdPlace = new Place ({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqtfvwK0cjXUWR6D0HAAVBUkXZYj7t1es10q3UYUfhtk-r5hxPYtei_oSLfQUvyNeGi3S2VIe3u2XPrkmN_BRb82BcVeOACfUJhK4ig2QLCkau6u6GEjQmGvGdzCHdW9Jyzzok8=s680-w680-h510-rw',
        creator
                
    });

     try{

     
     await createdPlace.save(); //saving a files to the database , async makes it fast 
     } catch(err){
        const error = new HttpError(
            'creating place failed please try again', 500
        );
        return next(error);

     }

    res.status(201).json({place: createdPlace});

};


const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        throw new HttpError('invalid inputs passwed please check your data', 422);
    }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatePlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId); // ✅ use findIndex

  updatePlace.title = title;
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};



const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
       throw new HttpError('could not find the place for that id.',404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({message: 'Deleted place'});

};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;