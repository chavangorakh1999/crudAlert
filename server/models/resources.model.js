const mongoose = require('mongoose')

const Schema=mongoose.Schema;

let schema= new Schema({
    name:{
        type: String,
        required: true
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

const Resources = mongoose.model('Resources',schema);

module.exports=Resources;
