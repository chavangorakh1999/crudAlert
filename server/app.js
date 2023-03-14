const path = require('path');
require('dotenv').config({
	path: path.join(__dirname, '.env')
});
const mongoose=require('mongoose')
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser');
const routes= require('./routes/api.route')
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(cors());

mongoose.connect('mongodb://localhost:27017/crudAlertDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use('/api',routes);

module.exports=app

