/*
 * class representing the controller
 */

 class Controller {
   /**
    * Initiate responding to get requests immediately when constructed
    */
   constructor(app, database){
     app.get('/new/*', this.input.bind(this));
     app.get('/:code', this.find.bind(this));
     this._database = database;
   }

   /**
    * Handle requests for shortening the provided urls
    */
   input(req, res){
     this._database.store(req.params[0])
     .then((encoded) => {
       res.end(JSON.stringify(encoded));
     })
     .catch(err => console.log(err));
   }

   /**
    * Handle finding the original urls for the requested code and redirecting
    * to these urls
    */
   find(req, res){
     this._database.find(req.params.code)
     .then(url => {
       if(!url){
         res.end('{"err": "The code was not found"}');
       }
       else {
         res.redirect(url);
       }
     })
     .catch(err => console.log(err));
   }

 }

 module.exports = Controller;
