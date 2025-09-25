const Ensureauthenticated = require('../middleware/authhandler');

const router=require('express').Router();

router.get('/',Ensureauthenticated,(req,res)=>{
    console.log('---loggedin user details---',req.user);
 
   
})


module.exports=router