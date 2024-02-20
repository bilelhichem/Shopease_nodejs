const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:{
         type:"string",
         required: true,
         unique: true
    },
    FirstName: {
        type: String,
        required: [false, "Please provide username"],
        max: 255 // This validation should be done in Joi
    },
    SecondName: {
        type: String,
        required: [false, "Please provide secondename"],
        max: 255 // This validation should be done in Joi
    },
    email: {
        type: String,
        required: false,
        unique: true,
        minlength: 5, // Correct property name is `minlength` not `min`
        maxlength: 255 // Correct property name is `maxlength` not `max`
    },
    password: {
        type: String,
        required: false,
        minlength: 8,
        maxlength: 100
    }
});



function validateUser(user) {
    const schema = Joi.object({
        FirstName: Joi.string().max(255).required(),
        SecondName: Joi.string().max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    });
    return schema.validate(user);
}

  


UserSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }catch(err){
        throw err;
    }
});








const User = mongoose.model("UserDb", UserSchema);
module.exports = {
    validateUser,
    User,

};
