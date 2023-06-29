var jwt = require("jsonwebtoken");
// which we have used while Authenticating the user 
const JWT_SECRET = "Mehavingagood$$$$"; // this is my VARIFY_SIGNATURE for JWT 

const fetchuser = (req,res,next)=>{
    // get the user from jwt token and add id to req object
    const token  = req.header('auth-token'); // finding the auth toen send by the route 2 to user
    if(!token){
        // if auth token not found then giving web page not available
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try
    {
        // if auth token found then retriving the user id from it which was send by us in route 2
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user; // sending user in the form of request to router 3
        next(); // this will make the route to proceed further for evaluation}
    }
    catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;