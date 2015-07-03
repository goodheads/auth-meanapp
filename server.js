require('dotenv').load();
var  express       = require('express'),
     jwt           = require('jsonwebtoken');
     morgan        = require('morgan'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     User          = require('./server/models/user.server.model'),
     cors          = require('cors'),
     secrets       = require('./config/secrets'),
     testdb        = require('./config/testdb'),
     route         = require('./server/routes');

var port = process.env.PORT || 3000;

/**
 * Connect to MongoDB.
 */
testdb.dbconnect();


/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public')); //use to serve static files like favicon, css, angular and the rest

/**
 * Routes Configuration
 */
route(app);

//configure any route whatsoever to redirect to angular
app.get('*', function(req, res) {
    /** frontend routes =========================================================
      * route to handle all angular requests
      * load the single view file (angular will handle the page changes on the front-end)
      **/
     res.sendFile(__dirname + '/public/index.html' );
});


/**
 * Start Express server.
 */
app.listen( port, function(){
  console.log("Mean Map Server Listening on port ", port );
});