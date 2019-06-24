const express = require('express');

const chalk = require('chalk');

const debug = require('debug')('app');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');




const app = express();
const morgan = require('morgan');
const path = require('path');

const port = process.env.PORT || 3000;

const nav = [{link:'/books', title:'Books'}, {link:'/author', title:'Author'}];
require('./src/config/passport.js')(app);
const bookRoute = require('./src/routes/books')(nav);
const adminRoute = require('./src/routes/adminRoutes')(nav);
const authRoute = require('./src/routes/authRoute')(nav);

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret: 'library',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } 
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/books', bookRoute);
app. use('/admin', adminRoute);
app.use('/auth', authRoute);


app.get('/', (req, res) => {
  res.render('index',
{
  nav:[{link:'/books', title:'Books'}, {link:'/author', title:'Author'}]
});
});
app.listen(port, () => {
  debug(`app listening to port ${chalk.green(port)}`);
});
