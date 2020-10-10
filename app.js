const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');


// Controllers
const homeRouter = require('./home/routes');

// Initialization
const app = express();

// Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


// Routes
app.use('/', homeRouter)


module.exports = app;
