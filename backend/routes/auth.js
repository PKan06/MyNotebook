const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcrypt'); // bcrypt -> to add a salt on a password to convert it to the safe text
var jwt = require('jsonwebtoken'); // token is use to sepecify the regular user crediential whether the user modified anything or not  
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "Mehavingagood$$$$"; // this is my VARIFY_SIGNATURE for JWT 

// ROUTER 1: Create a User using : POST"/api/auth/createuser" 
// this will check the validation of the post req send by the user on user.js if fine then add to database 
var Validaton_auth_schema = [
    
    // using express validator
    body('name', ' Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min : 5}),
];

router.post('/createuser',Validaton_auth_schema, 
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
            // given to user so that easy login afterwords
            res.json({authtoken}); // authtoken => authtoken : authtoken
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some error Occured")
        }
});
    
// ROUTER 2: Authenticating a User using : POST "/api/auth/login". No login required
var Validaton_login_schema = [
    // using express validator
    body('email', 'Enter a valid email').isEmail(),
    body('password',"Password cannot be blank").exists()
];
router.post('/login',Validaton_login_schema, 
async (req,res)=>{
    // error from validation_login_schema
    const errors = validationResult(req); // if validation is sussesfull then error will be empty 
    if(!errors.isEmpty())
    {
        // if error is not empty then it will send json file as a response to the user 
        return res.status(400).json({error: errors.array()});
    }
    // Destructuring email,password
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email}); // finding is the user login priviously or some fake email
        // if no user exist the undefine and we know somebody wants to break the authentication and getting in 
        // so we will display
        if(!user){
            return res.status(400).json({error : "Please try to login with correct email"});
        }
        // this will genrate hash using the password given by the user and check that hash with the stored value
        const passwordCompare = await bcrypt.compare(password, user.password);
        // if the password is wrong 
        // console.log(passwordCompare); -> promis will writen false if password is not correct 
        if(!passwordCompare){
            return res.status(400).json({error : "Please try to login with correct password"});
        }
        // giving the data which is used to genrate JWT token 
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // given to user so that easy login afterwords
        res.json({authtoken}); // authtoken => authtoken : authtoken
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error Occured")
        
    }
})

// ROUTER 3: Get login user details using : POST "/api/auth/getuser". No login required
router.post('/getuser', fetchuser,
async (req,res)=>{
    try {
        userID = req.user.id; // getting user id from fetchuser req
        console.log(userID);
        const user = await User.findById(userID).select("-password"); // password is hide after verifing the user 
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router