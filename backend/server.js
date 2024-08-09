const express = require('express');
const cors = require('cors');
const connectDB =  require('./config/db');
const bodyParser  = require('body-parser');
const { mongoose } = require('mongoose');
const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(bodyParser.json()); // middleware to parse json requests

// connect to mongodb
connectDB();

//enable cors
app.use(cors());

//Define routes

app.use('/api', formRoutes)


//start the server
app.listen(5000, ()=> console.log('Server is running on port 5000'))