/*
 * class representing the controller
 */

 class Controller {
   constructor(app, database){
     app.get('/new/:url', this.input.bind(this));
     app.get('/:code', this.find.bind(this));
     this._database = database;
   }

   input(req, res){
     console.log(req.params.url);
     console.log(this);
     this._database.store(req.params.url)
     .then(() => {
       res.end('success');
     })
     .catch(err => console.log(err));
   }

   find(req, res){
    /* this._database.find(req.params.code)
     .then()

     console.log();*/
   }


 }

 module.exports = Controller;
