const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var indexRouter = require('./app/routes/index');
var catalogRouter = require('./app/routes/catalog.routes');


var corsOptions = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route 
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

// DB
var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/locallibrary_db";
mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => {
        console.log('Database sucessfully connected')
    },
    error => {
        console.log('Database could not connected: ' + error)
    }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error:' ));

//set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;