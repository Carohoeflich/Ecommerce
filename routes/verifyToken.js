const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]; //split to take the actual token in mongoDB header, instead of also the word Bearer
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user
            next()
        })
    } else{
        return res.status(400).json("Not authenticated");
    }
};

const verifyTokenAndAuthorization = (req,res, next) =>{
   verifyToken(req,res,() =>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        next()
    }else {
        res.status(403).json("You dont have authorization")
    }
   })
}

//verify if the user is an admin, to be able to update or change products and orders etc
const verifyTokenAndAdmin = (req,res, next) =>{
    verifyToken(req,res,() => {
     if(req.user.isAdmin){
         next();
     }else {
         res.status(403).json("You dont have authorization")
     }
    });
 };


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};