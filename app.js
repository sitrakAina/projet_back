const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const passport = require('passport');
const config = require('./config/db');
const users = require('./routes/route');

app.use(methodOverride('X-HTTP-Method')) 
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('X-Method-Override'))
app.use(methodOverride('_method'))
app.use(cors())
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

app.use(passport.initialize());
require('./passport')(passport);

//Définition du routeur
var router = express.Router();
require(__dirname + '/controllers/atelierController')(router);

app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});