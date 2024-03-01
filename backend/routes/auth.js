const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middelware/fetchuser');

JWT_SECRET = 'Abhishek$Nigam'
//Route : 1.  Creat a user using post : POST "/api/auth/createuser", No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 5 characters').isLength({min :5}),
],async(req, res)=>{
  //If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors : errors.array()});
    }
    //check whethere the user with same email exist
    try{
    let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({error : "Sorry user with same this email already exists"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const SecPass = await bcrypt.hash(req.body.password, salt) 

    //creat user
   user = await User.create({
    name : req.body.name,
    email : req.body.email,
    password : SecPass
   })
   const data ={
    user:{
      id : user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET)
  res.json({authToken})
   
  } catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})
//Route : 2. Creat a Authentication Login using post : POST "/api/auth/login"
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
],async(req, res)=>{

  //If there are errors, bad request and the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors : errors.array()});
    }
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({error : "Please try to login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({error: "Please try to login with correct credentials"})
      }
      const data ={
        user:{
          id : user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      res.json({authToken})

    } catch (error) {
      console.error(error.message);
    res.status(500).send("Internal Server Error")
    }
})

//Route : 2. Get a user loggedin details using post : POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async(req, res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
}catch (error) {
  console.error(error.message);
res.status(500).send("Internal Server Error")
}
})
module.exports = router