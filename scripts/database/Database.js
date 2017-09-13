/*
 * class representing the database
 */

 class Database {
   constructor(db) {
     this._db = db;
   }

   /**
    *
    * @param {Object} url
    */
   store(url){
     return new Promise((resolve, reject) => {
       this.encode(url)
       .then(encoded => {
         this._db.collection('urls').insertOne(encoded).then(() => {
           resolve(encoded);
         });
       })
       .catch(err => console.log(err));
     });
   }

   find(code){
     return new Promise((resolve, reject) => {
       const query = {"short_url": "https://not-so-short-url.herokuapp.com/" + code};
       this._db.collection('urls').findOne(query).then(doc => {
         if(!doc) {
           resolve(null);
           return;
         }
         const url = doc.original_url;
         resolve(url);
       })
       .catch(err => console.log(err));
     });
   }

   encode(url){
     return new Promise((resolve, reject) => {
       this._db.collection('urls').find().toArray().then(docs => {
         do {
           var code = 10000 + Math.floor(Math.random()*90000);
           var found = false;

           docs.forEach(doc => {
             if(!doc.short_url) return;
             let storedCode = doc.short_url.match(/\d+$/)[0];
             if(code == storedCode){
                found = true;
             }
           })
         } while(found === true);

         const encoded = {
           "original_url": url,
           "short_url": "https://not-so-short-url.herokuapp.com/" + code
         };
         resolve(encoded);
       });
     });
   }
 }

module.exports = Database;
