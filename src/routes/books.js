const express = require('express');

const bookRoute = express.Router();

function router(nav){
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

  bookRoute.route('/').get((req, res) => {
    res.render('books',
    {
      nav,
      book
    }
  );
  });
  bookRoute.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('book-view',
    {
      nav,
      book:book[id]
    }
  );
  });

  return bookRoute;
}

module.exports = router;
