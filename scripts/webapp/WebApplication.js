const express = require('express');
const app = express();
const Controller = require('../controller/Controller.js');
const Database = require('../database/Database.js');


class WebApplication{
  constructor(dbConnection){
    this._dbConnection = dbConnection;
  }

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
