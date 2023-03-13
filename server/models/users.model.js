const mongoose = require('mongoose')

const Schema=mongoose.Schema;

let schema= new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: new Date().toUTCString()
    },
    updated_at: {
        type: Date,
        default: new Date().toUTCString()
    },
    deleted_at: {
        type: Date,
        default: new Date().toUTCString()
    }    
});

const Users = mongoose.model('Users',schema);

module.exports=Users;
