const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("./verifyToken");


//PUT
router.put("/:id", verifyToken.verifyTokenAndAuthorization, async (req,res) =>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});  //mongoDB methods
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE SPECIFIC USER BY ID
router.delete("/:id", verifyToken.verifyTokenAndAuthorization, async (req, res) => {
    try{
await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});


//GET SPECIFIC USER BY ID
router.get("/find/:id", verifyToken.verifyTokenAndAdmin, async (req, res) => {
    try{
const user = await User.findById(req.params.id);
const { password, ...others } = user._doc; //the ._doc is for mongoDB, bc thats where they store the info
    //this const make it so it shows everything BUT the password.

    res.status(200).json({others});
    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL USERS
router.get("/", verifyToken.verifyTokenAndAdmin, async (req, res) => {
    try{
const users = await User.find();
    res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;