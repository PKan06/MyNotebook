const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcrypt'); // bcrypt -> to add a salt on a password to convert it to the safe text
var jwt = require('jsonwebtoken'); // token is use to sepecify the regular user crediential whether the user modified anything or not  

const JWT_SECRET = "Mehavingagood$$$$"; // this is my VARIFY_SIGNATURE for JWT 

// this will check the validation of the post req send by the user on user.js if fine then add to database 
var Validaton_auth_schema = [

    // using express validator
    body('name', ' Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min : 5}),
    ];

router.post('/',Validaton_auth_schema, 
    async (req, res)=>{
        const errors = validationResult(req); // if validation is sussesfull then error will be empty 
        if(!errors.isEmpty())
        {
            // if error is not empty then it will send json file as a response to the user 
            return res.status(400).json({error: errors.array()});
        }
        // res.send(req.body); // giving double header problem 
        
        try {
            // checking any duplicate value of email in database 
            let user = await User.findOne({email: req.body.email});// we have to wait until it will check our database for duplicate email entry
            // we apply await before promis  
            // console.log(user); // null if any user not find 
            if(user){
                // returning bad request as we found the user with the same email
                return res.status(400).json({'error':"Sorry a user with this email already exists"})
            }
            const salt = await bcrypt.genSalt(10); // genrating slat ehich will be added sfter password before saving to db
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name : req.body.name,
                password: secPass, 
                email : req.body.email
            })
            // defining the data part for the JWT token 
            // As id is unique for every data mamber
            // if the user again login then we will verify using jwt token if there any change with the heder, data, JWT_SECRET 
            const data = {
                user:{
                    id : user.id
                }
            };
            // read about session token && Json web token(HEADER.PAYLOAD.VARIFY_SIGNATURE)
            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({authtoken}); // authtoken => authtoken : authtoken

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some error Occured")
        }
})

module.exports = router