const mongoose = require('mongoose')

const Schema=mongoose.Schema;

let schema= new Schema({
    
});

const Users = mongoose.model('Users',schema);

module.exports=Users;
