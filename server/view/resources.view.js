const Mongoose = require('mongoose');
const Validator = require('validatorjs');
const Resources_model=require('../models/resources.model')
const ResponseCodes = require('../middleware/response-code');
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;

module.exports= {
    readResource(req,res){
            Resources_model.find({})
            .then((resource)=>{
                response_code.message="Resource fetched successfully";
                response_code.data=resource;
                global.io.emit('message', 'Resource fetched successfully');
                res.status(success_status).send(response_code.success());
            })
            .catch((err)=>{
                response_code.error = {
                    'message':{...err}
                }
                res.status(server_status).send(response_code.serverError());
            })
    }
}