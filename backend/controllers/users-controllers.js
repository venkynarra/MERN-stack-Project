const { v4: uuidv4 } = require('uuid');


const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
    
{
    id: 'u1',
    name: 'venky',
    email: 'venky@gmail.com',
    password: 'testers'
    


}
];


const getUsers = (req, res, next) => {
    res.status(200).json({users: DUMMY_USERS});
};

const signup = async (req, res, next) => {
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        return next ( new HttpError('invalid inputs passed please check your data', 422));
    }


    const{ name, email, password, places} = req.body;

let existingUser
    try{
         existingUser = await User.findOne({email: email})
    }catch(err){
        const error = new HttpError('Signing up Failed! please try agaion later', 500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('user exist already! please log in', 422);
        return next(error);
    }



    const createdUser = new User({
        name, 
        email,
        image:'https://www.google.com/imgres?q=images&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F674010%2Fpexels-photo-674010.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-anjana-c-169994-674010.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&docid=B51x0PBR9KNzvM&tbnid=sKMM4eBjWSQEBM&vet=12ahUKEwjdtqaqnbqNAxUHGtAFHTtxBxkQM3oECBwQAA..i&w=2976&h=3968&hcb=2&ved=2ahUKEwjdtqaqnbqNAxUHGtAFHTtxBxkQM3oECBwQAA',
        password,
        places 
    });
  try{
    await createdUser.save();
  } catch (err){
    const error = new HttpError('signing up failed, please try again!', 500);
    return next(error);
  }

 res.status(201).json({user: createdUser.toObject({getters: true})});
};

const login = async (req, res, next) => {
const {email, password} = req.body;

let existingUser;

    try{
         existingUser = await User.findOne({email: email})
    }catch(err){
        const error = new HttpError('Login Failed! please try agaion later', 500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('user exist already! please log in', 422);
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Inavlid Credentials, could not log in' ,401);
        return next(error);
    }



res.json({message: 'Logged in!'});

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;