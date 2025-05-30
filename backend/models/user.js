const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;   

const userSchema = new Schema({   //creating a user model schema. 
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},//unique speeds up the process while retrivng email.
    password:{type: String, required: true, minLenght: 6},
    image: {type: String, required: true},
    places: [{type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);