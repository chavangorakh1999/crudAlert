const express = require('express');
const router=express.Router();
const{generateToken} = require('../controller/users.controller');
const {createResource,updateResource,deleteResource}=require('../controller/resources.controller')
const {readResource}=require('../view/resources.view')
const {alertMessage} = require('../controller/alert.controller')
const {validateToken}=require('../middleware/config')

router.post('/generate-token',generateToken);

router.post('/create-resource',validateToken,createResource);

router.post('/update-resource',validateToken,updateResource);

router.post('/send-broadcast',validateToken,alertMessage);

router.post('/delete-resource',validateToken,deleteResource);

router.get('/read-resource',validateToken,readResource);


router.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: "Oops! URL not found, try something different!"
    })
});

module.exports=router;