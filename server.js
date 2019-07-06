'use strict';

// Initial Required Imports
const express = require('express'),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger-file/swagger.json');

// NodeJS Express App
const app = express();

// Mongo DB Connection
const mongoose = require('mongoose');
const mongoDB_URL = 'mongodb://localhost:27017/empdb';
mongoose.connect(mongoDB_URL);
mongoose.Promise = global.Promise;

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB Connection Error: '));


// Set API Requirements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Swagger Documentation Configuration Mapping
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Router Configuration with App
const employeeRouter = require('./employee/employee.router');
app.use('/api/v1', employeeRouter);

// Listening Port and Server Start 
const port = 3000;
app.listen(port, () => {
    console.log(`NodeJS Server: Express Swagger App Running on ${port}`);
});