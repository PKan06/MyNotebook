const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// this will check the validation of the post req send by the user on user.js if fine then add to database 
var Validaton_auth_schema = [

    // using express validator
    body('name', ' Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min : 5}),
    ];

router.post('/',Validaton_auth_schema, 
    (req, res)=>{
        const errors = validationResult(req); // if validation is sussesfull then error will be empty 
        if(!errors.isEmpty())
        {
            // if error is not empty then it will send json file as a response to the user 
            return res.status(400).json({error: errors.array()});
        }
        // res.send(req.body); // giving double header problem 
        
        // creating the data to database 
        User.create({
            name : req.body.name,
            password: req.body.password, 
            email : req.body.email
        }).then(User => res.json(User)) // updating the data to database 
        .catch(err => {
            console.log(err) // if there is errorr encouter while updating the database then it will display in the consol
            res.json({"error": 'Please Enter a Unique Value of Email', message: err.message}) // this will send that error to the user for displaying what happend 
        }); // written promises and catch the error  (catch/then)
})

module.exports = router