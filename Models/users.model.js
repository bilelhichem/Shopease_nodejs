const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: {
        type: String,
        required: [true, "Please provide username"],
        max: 255 // This validation should be done in Joi
    },
    SecondName: {
        type: String,
        required: [true, "Please provide secondename"],
        max: 255 // This validation should be done in Joi
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5, // Correct property name is `minlength` not `min`
        maxlength: 255 // Correct property name is `maxlength` not `max`
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    }
});

const User = mongoose.model("UserDb", UserSchema);

function validateUser(user) {
    const schema = Joi.object({
        FirstName: Joi.string().max(255).required(),
        SecondName: Joi.string().max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    });
    return schema.validate(user);
}

module.exports = {
    validateUser,
    User
};
