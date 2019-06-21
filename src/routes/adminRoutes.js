const express = require('express');

const {MongoClient} = require('mongodb');

const debug = require('debug')('app:adminRoutes');

const adminRoute = express.Router();

const book =[
  {
    title:'war and fights',
    author:'roman mkoji',
    gener:'fiction reality',
    read:false
  },
  {
    title:'anjelina and julian',
    author:'princilar',
    gener:'love story',
    read:false
  },
  {
    title:'pirates of kenya',
    author:'munguti',
    gener:'kenya war',
    read:false
  },
  {
    title:'war and fights',
    author:'roman mkoji',
    gener:'fiction reality',
    read:false
  }
];
function router(nav){
  adminRoute.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const  dbName = 'libraryApp';
    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('server connected.....');

        const db = client.db(dbName);
        const response = await db.collection('book').insertMany(book);
        res.json(response);
      } catch (err) {
         debug(err.stack);
      }
      client;
    }());
  });
  return adminRoute;
}
module.exports = router;
