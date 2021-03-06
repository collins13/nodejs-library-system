const express = require('express');

const {MongoClient} = require('mongodb');

const debug = require('debug')('app:authRoute');
const passport = require('passport');

const authRouter =  express.Router();

function router(nav){
  authRouter.route('/signUp')
    .post((req, res) =>{
      const {username, email, password} = req.body;
      const url = 'mongodb://localhost:27017';
      const  dbName = 'libraryApp';

      (async function addUser(){
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('server connected.....');

          const db = client.db(dbName);
          const col = await db.collection('users');
          const user = {username, email, password};
          const result = await col.insertOne(user);
          debug(result);
          req.login(result.ops[0], ()=>{
            res.redirect('/auth/profile');
          });
        } catch (err) {
           debug(err);
        }
      }());

    });

    authRouter.route('/signIn')
    .get((req, res) =>{
      res.render('signin',{
        nav,
        title:'signin'
      });
    })
    .post(passport.authenticate('local', {
      successredirec: '/auth/profile',
      failureredirect:'/'
    }));
    authRouter.route('/profile')
    .get((req, res)=>{
      res.json(req.user);
    })
    return authRouter;
  }

  module.exports = router;
