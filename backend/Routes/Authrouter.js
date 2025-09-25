const router=require('express').Router()
const { login, signup, Updateuser, Getusers } = require('../controller/authconroller');
const {Loginvalidation,Signupvalidation} =require('../middleware/authvalidation');



router.post('/login',Loginvalidation,login)

router.post('/signup',Signupvalidation,signup)

router.put('/updateuser/:_id',Updateuser)

router.post('/getuser',Getusers)

module.exports=router
