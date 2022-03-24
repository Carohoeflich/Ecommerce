const router = require("express").Router();
const User = require("../models/User"); //import my user model
const CryptoJS = require("crypto-js"); //for safe passwords
const jwt = require("jsonwebtoken"); // share secure information between parties

//Registration
router.post("/register", async (req,res) => {
    //creating the model of the registration first
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString() //all this to encrypt the password
    });
 //save the info to our DB
 try{
 const savedUser = await newUser.save();
 res.status(200).json(savedUser)
}catch(err){
    res.status(500).json(err);
}
});

//Login
router.post("/login", async (req,res) =>{
    try{
    const user = await User.findOne({username: req.body.username});
    !user && res.status(400).json("Username is incorrect.")
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !==req.body.password && res.status(400).json("Password is Incorrect.")

    const accessToken = jwt.sign({
        id:user._id, //._id for mongoDB
        isAdmin: user.isAdmin,
    }, process.env.JWT_SEC,
    {expiresIn:"15d"}
    );

    const { password, ...others } = user._doc; //the ._doc is for mongoDB, bc thats where they store the info
    //this const make it so it shows everything BUT the password.

    res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err)
    }
});


module.exports = router