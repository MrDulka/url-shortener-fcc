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
     const encoded = this.encode(url);
     return this._db.collection('urls').insert(obj);
   }

   find(code){

   }

   encode(url){
     const code = 10000 + Math.random()*90000;
     const encoded = {
       "original_url": url,
       "short_url": code
     }
   }
 }

module.exports = Database;
