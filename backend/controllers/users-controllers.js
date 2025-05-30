


const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers =async (req, res, next) => {
    let users;
    try{
         users =  await User.find({} , '-password') ;
    } catch (err) {
        const error = new HttpError('fetching users failed!', 500);
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({getters: true}))});
   
};

const signup = async (req, res, next) => {
     const errors = validationResult(req);
    if(!errors.isEmpty()){

        
        return next ( new HttpError('invalid inputs passed please check your data', 422));
    }


    const{ name, email, password} = req.body;


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

    let hashedPassword; 
    try{
       hashedPassword = await bcrypt.hash(password, 12);

    }catch(err){
      const error = new HttpError('could not create user please try again', 500);
      return next(error);

    }
   



    const createdUser = new User({
        name, 
        email,
        image: 'uploads/images/' + req.file.filename,
        password: hashedPassword,
        places: []
    });

  try{
    await createdUser.save();
  } catch (err){
    const error = new HttpError('signing up failed, please try again!', 500);
    return next(error);
  }
  let token;
  try{
    token = jwt.sign({userId: createdUser.id , email: createdUser.email}, process.env.JWT_KEY, {expiresIn: '1h'});


  }catch(err){
    const error = new HttpError('signing up failed, please try again!', 500);
    return next(error);

  }
  


 res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Login failed! Please try again later.', 500);
    return next(error);
  }


  
  if (!existingUser) {
     const error = new HttpError('Invalid credentials, could not log you in.', 401);
    return next(error);
   
    
  }
  let isValidPassword = false;
  try{

      isValidPassword = await bcrypt.compare(password, existingUser.password);
  }catch(err) {
     const error = new HttpError('Login failed! please check your credentials and try again', 500);
    return next(error);

  }
if(!isValidPassword){
   const error = new HttpError('Invalid credentials, could not log you in.', 401);
    return next(error);

}
let token;
  try{
    token = jwt.sign({userId: existingUser.id , email: existingUser.email}, process.env.JWT_KEY, {expiresIn: '1h'});


  }catch(err){
    const error = new HttpError('signing up failed, please try again!', 500);
    return next(error);

  }
  // ✅ Login Success
  res.json({ userId: existingUser.id, email: existingUser.email, token: token });
};








exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;