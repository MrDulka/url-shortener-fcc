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
     this._database.store(req.params.url)
     .then((encoded) => {
       res.end(JSON.stringify(encoded));
     })
     .catch(err => console.log(err));
   }

   find(req, res){
     this._database.find(req.params.code)
     .then(url => {
       res.redirect(url)
     })
     .catch(err => console.log(err));
   }


 }

 module.exports = Controller;
