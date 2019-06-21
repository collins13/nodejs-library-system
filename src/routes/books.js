const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');

const debug = require('debug')('app:books');
const bookRoute = express.Router();

function router(nav){

  bookRoute.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const  dbName = 'libraryApp';
    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('server connected.....');

        const db = client.db(dbName);
        const col = await db.collection('book');
        const book = await col.find().toArray();

        res.render('books',
        {
          nav,
          book
        }
      );
      }catch(err){
        debug(err.stack);
  }
  client
}());
  });

  bookRoute.route('/:id').get((req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const  dbName = 'libraryApp';

    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('server connected.....');

        const db = client.db(dbName);
        const col = await db.collection('book');
        const books = await col.findOne({_id: objectId(id).str});
        res.render('book-view',
        {
          nav,
          book
        }
      );
    }catch(err){
      debug(err.stack);
    }
    client;
    }());
  });

  return bookRoute;
}

module.exports = router;
