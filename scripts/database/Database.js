const validUrl = require('valid-url');
/*
 * class representing the database
 */
 class Database {
   constructor(db) {
     this._db = db;
   }

   /**
    * Store a url in the database, encoding it first
    * @param {string} url - url to be stored
    * @return {Promise} promise that resolves after the url was stored
    * with an object containg the pair of original and encoded urls
    */
   store(url){
     return new Promise((resolve, reject) => {
       if (!validUrl.isWebUri(url)){
         resolve({error: "Wrong url format"});
         return;
       }
       this.encode(url)
       .then(encoded => {
         return this._db.collection('urls').insertOne(encoded);
       })
       .then(result => {
         let inserted = result.ops[0];
         /*since inserting encoded pair mutates it and adds _id property, we
         have to reverse this and delete the _id property before resolving */
         delete inserted._id;
         resolve(inserted);
       })
       .catch(err => console.log(err));
     });
   }

   /**
    * Finds the code in the database
    * @param {number} code - code that we are searching for
    * @return {promise} promise that resolves with a string containing the original url
    * that is encoded under this code
    */
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

   /**
    * Creates a code for the given url, checking if it is unique
    * @param {string} url - url to be encoded
    * @return {Promise} promise that resolves with an object containing the pair
    * of the original url and the encoded url
    */
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
