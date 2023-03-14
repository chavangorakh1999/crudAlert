const Mongoose = require('mongoose');
const Validator = require('validatorjs');
let users=require('../utility/users')
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

module.exports= {
    generateToken(req,res){
    let email=req.body?.email;
    let password=req.body?.password;

    let data= {
        email,
        password
    }
    let rules = {
        email:'required|email',
        password:'required|string|min:6'
    }

    let validation = new Validator(data, rules);

    if(!validation.passes()){
        response_code.error = {
            'message':{...validation.errors.errors}
        }
        res.status(request_status).send(response_code.badRequest());
    }else{

                if (users.some(user => user.email === email)) {
                    if (users.some(user => user.email === email&&user.password=== password)) {
                        //Create authrization token on the basis of email and password
                        const payload = {
                            user: email
                        };
                        //set up the validity of generated token
                        const options = {
                            expiresIn: process.env.EXPIRES_IN,
                            issuer: process.env.ISSUER
                        };
                        //get Secret key from .env file
                        const secret = process.env.SECRET_KEY;
                        //method to generate jsonwebtoken
                        const token = jwt.sign(payload, secret, options);

                                response_code.message = 'Token generated successfully';
                                response_code.data={}
                                response_code.data['token'] = 'Bearer ' + token;
                                global.io.emit('message', 'Token generated successfully');
                                res.status(success_status).send(response_code.success());
                    } else {
                        response_code.message = 'Something went wrong, make sure your email and password are correct and try again';
                        response_code.error = {
                            'message': "Email or password incorrect"
                        };
                        res.status(auth_status).send(response_code.unauthorized());
                    }
                } else {
                    response_code.error = {
                        'message': "User email does not exist"
                    };
                    res.status(access_status).send(response_code.forbidden());
                }   
    }
    }
}