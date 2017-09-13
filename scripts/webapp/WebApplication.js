const express = require('express');
const app = express();
const Controller = require('../controller/Controller.js');
const Database = require('../database/Database.js');

/**
 * class representing the web application
 */
class WebApplication{
  /**
   * crate the app
   * @param {Promise} dbConnection - promise that resolves with the database after
   * connecting to it
   */
  constructor(dbConnection){
    this._dbConnection = dbConnection;
  }

  /**
   * Start the application, initiate database and controller
   */
  start(){
    this._dbConnection.then(db => {
      const database = new Database(db);
      const controller = new Controller(app, database);
    })
    .catch(err => console.log(err));

    const port = process.env.PORT || 5000;
    app.listen(port);
  }
}

module.exports = WebApplication;
