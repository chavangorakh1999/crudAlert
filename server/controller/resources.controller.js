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
    createResource(req,res){
    let name=req.body?.name;

    let data= {
        name
    }
    let rules = {
        name:'required|string'
    }

    let validation = new Validator(data, rules);

    if(!validation.passes()){
        response_code.error = {
            'message':{...validation.errors.errors}
        }
        res.status(request_status).send(response_code.badRequest());
    }else{      
        var new_resource=new Resources_model({name:name});
        new_resource.save().then((result)=>{
            response_code.message="Resource created successfully";
                response_code.data=result;
                global.io.emit('message', 'Resource created successfully');
                res.status(success_status).send(response_code.success());
        }).catch((err)=>{
            response_code.error = {
                'message':{...err}
            }
            res.status(server_status).send(response_code.serverError());
        })
    }
    },
    updateResource(req,res){
        let name=req.body?.name;
        let updated_name=req.body?.updated_name;
        let data= {
            name,
            updated_name
        }
        let rules = {
            name:'required|string',
            updated_name:'required|string'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{      
            Resources_model.updateOne({name:name},{$set:{name:updated_name}},{upsert:true})
            .then((resource)=>{
                response_code.message="Resource updated successfully";
                response_code.data=resource;
                global.io.emit('message', 'Resource updated successfully');
                res.status(success_status).send(response_code.success());
            })
            .catch((err)=>{
                response_code.error = {
                    'message':{...err}
                }
                res.status(server_status).send(response_code.serverError());
            })
        }
    },
    deleteResource(req,res){
        let name=req.body?.name;
        let data= {
            name
        }
        let rules = {
            name:'required|string'
        }
    
        let validation = new Validator(data, rules);
    
        if(!validation.passes()){
            response_code.error = {
                'message':{...validation.errors.errors}
            }
            res.status(request_status).send(response_code.badRequest());
        }else{      
            Resources_model.deleteOne({name:name})
            .then((resource)=>{
                response_code.message="Resource deleted successfully";
                response_code.data=resource;
                global.io.emit('message', 'Resource deleted successfully');
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