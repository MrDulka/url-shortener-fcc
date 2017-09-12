require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

const dbURI = process.env.MONGOLAB_URI;

const dbConnection = MongoClient.connect(dbURI);

const WebApplication = require('./scripts/webapp/WebApplication.js');
const webapp = new WebApplication(dbConnection);
webapp.start();
