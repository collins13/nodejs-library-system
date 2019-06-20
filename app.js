const express = require('express');

const chalk = require('chalk');

const debug = require('debug')('app');

const app = express();
const morgan = require('morgan');
const path = require('path');

const port = process.env.PORT || 3000;

const nav = [{link:'/books', title:'Books'}, {link:'/author', title:'Author'}];
const bookRoute = require('./src/routes/books')(nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/books', bookRoute);


app.get('/', (req, res) => {
  res.render('index',
{
  nav:[{link:'/books', title:'Books'}, {link:'/author', title:'Author'}]
});
});
app.listen(port, () => {
  debug(`app listening to port ${chalk.green(port)}`);
});
