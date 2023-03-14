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
        let page=req.body?.page;
        let limit=req.body?.limit;

        let data= {
            page,
            limit
        }
        let rules = {
            page:'required|numeric',
            limit:'required|numeric'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{
            page=Number(page);
            limit=Number(limit);
            Resources_model.find({},{},{
                    skip: ((limit * page) - limit),
                    limit: limit
                })
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
}