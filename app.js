const express = require('express'),
    cors = require('cors'),
    app = express(),
    mongoose = require("mongoose"),
    shopRouter = require("./routes/shopRouter.js"),
    sellerRouter = require("./routes/sellerRouter.js"),
    orderRouter = require("./routes/orderRouter.js"),
    usersRouter = require("./routes/usersRouter.js"),
    authRouter = require("./routes/authRouter.js"),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    User = require('./models/User.model.js'),
    localStrategy = require('passport-local'),
    auth = require('./middleware/auth.js')();
const dbConfig = require('./dbConfig');
app.use(cors());


/*
* Connection to the users MongoDB DataBase
*
*/
mongoose.connect(dbConfig.mongo 
, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


/*
 * Configure the app 
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());

/*
 * Configure passport
*/
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
* Configure Routers
*
*/
app.use('/shops', auth.authenticate(), shopRouter);
app.use('/sellers', auth.authenticate(), sellerRouter);
app.use('/orders', auth.authenticate(), orderRouter);
//app.use('/users', usersRouter); /* Voir l'utilité pour le projet */
app.use('/', authRouter);

module.exports = app;