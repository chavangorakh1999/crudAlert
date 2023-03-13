const express = require('express');
const router=express.Router();
const{register,signIn} = require('../controller/users.controller');
const {alertMessage}=require('../controller/alert.controller')

router.get('/register',register);

router.get('/sign-in',signIn);

router.post('/messages',alertMessage);


router.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: "Oops! URL not found, try something different!"
    })
});

module.exports=router;