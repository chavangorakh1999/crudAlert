const Mongoose = require('mongoose');
const Validator = require('validatorjs');
const ResponseCodes = require('../middleware/response-code');
const jwt = require('jsonwebtoken');
var response_code = new ResponseCodes();
var server_status = response_code.serverError().status;
var server_unavailable_status = response_code.serverUnavailable().status;
var data_status = response_code.dataNotFound().status;
var request_status = response_code.badRequest().status;
var access_status = response_code.forbidden().status;
var auth_status = response_code.unauthorized().status;
var success_status = response_code.success().status;

module.exports={
    alertMessage(req,res){
        const message = req.body.message;
        const room_id=req.body?.room_id;

        let data= {
            message,
            room_id
        }
        let rules = {
            message:'required|string|min:6',
            room_id:'required|string|min:4'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            global.io.sockets.in(room_id).emit('message', message);
            response_code.message='Message broadcasted successfully.';
            res.status(success_status).send(response_code.success());
        }

    }
}