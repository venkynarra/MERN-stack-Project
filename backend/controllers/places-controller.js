
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

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
let places;
try{
    places = await Place.find({creator: userId}).exec();

}catch(err){
    const error = new HttpError(
        'fetching places failed, please try again', 500
    );
    return next(error);
}
     
    
    if (!places || places.length === 0) {
        return next(
         new HttpError("could not find the places for provided User Id!", 404)
        );
    } 
    
    res.json({places: places.map(place => place.toObject({getters: true}))}); // getters makes data clean convert monggos eobject into javascripit object


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


const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        throw new HttpError('invalid inputs passwed please check your data', 422);
    }
  const { title, description } = req.body;
  const placeId = req.params.pid;


  let place;
  try{
    place =  await Place.findById(placeId);
  }catch (err){
    const error = new HttpError('something went wrong could not update!', 500);
    return next(error);
  };

 

   place.title = title;
   place.description = description;

  try{
    await place.save();
  } catch (err){
    const error = new HttpError('something went wrong cpuld not update the place!', 500);
    return next(error);
  }

  res.status(200).json({ place:  place.toObject({getters: true}) });
};



const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
    console.log('Found place:', place);
  } catch (err) {
    console.error('Error in findById:', err);
    const error = new HttpError('Something went wrong, could not delete the place.', 500);
    return next(error);
  }

  if (!place) {
    console.log('No place found for id:', placeId);
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }

  try {
    await Place.findByIdAndDelete(placeId); // or: await Place.findByIdAndDelete(placeId)
    console.log('Place removed successfully');
  } catch (err) {
    console.error('Error in remove:', err);
    const error = new HttpError('Something went wrong, could not delete the place.', 500);
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};




exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;