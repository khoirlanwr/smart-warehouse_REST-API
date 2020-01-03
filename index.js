// import redis
const redisClient = require('redis').createClient;
let redis = redisClient(6379, '54.90.63.207');

// Import express
let express = require('express');

var cors = require('cors');


// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express().use("*", cors());

console.log("______ Starting system ________");


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://vian:vian@cluster0-1cuic.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Connect to Mongoose and set connection variable
// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});

mongoose.connect('mongodb+srv://vian:vian@cluster0-1cuic.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true
});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("****** Error connecting db ***********")
else
    console.log("_________ Db connected successfully ___________")


redis.on('connect', function() {
    console.log('__________Redis client connected__________');
});

redis.on('error', function (err) {
    console.log('********* Something went wrong **********' + err);
});

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and nodemon'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});