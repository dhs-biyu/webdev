var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var app = express();
var port = 8888;
 
var jokes=[{setup:"Our wedding was so beautiful,",punchline:"even the cake was in tiers", votes: 0},{setup:"I'm reading a book on the history of glue",punchline:"I just can't seem to put it down", votes: 0},{setup:"What do you call an Argentinian with a rubber toe?",punchline:"Roberto", votes: 0}];
var uri = "mongodb://anonymousby1:weakpassword1@ds023485.mlab.com:23485/webdev";

app.use(bodyParser.json());
app.listen(process.env.PORT || port, function(){
    console.log("Listening on " + port);
});

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
    res.sendFile(__dirname + '/app.js');
});

app.get('/style.css', function(req, res) {
	res.sendFile(__dirname + '/style.css');
});

app.post('/upvote', function(req, res) {
    console.log("someone upvoted.");
    console.log(req.body);
   
    var jokeIndex = req.body.id;
   
    mongodb.connect(uri, function(err, db) {
        var collection = db.collection('jokes');
        collection.findOneAndUpdate( {_id: ObjectId(jokeIndex)}, { $inc: {"votes": 1} }, function(err, result) {
            console.log(result.value);
            result.value.votes++;
            res.send(result.value);
        });
    });
   
});
 
app.post('/downvote', function(req, res) {
    console.log("someone downvoted.");
    console.log(req.body);
   
    var jokeIndex = req.body.id;
   
    mongodb.connect(uri, function(err, db) {
        var collection = db.collection('jokes');
        collection.findOneAndUpdate( {_id: ObjectId(jokeIndex)}, { $inc: {"votes": -1} }, function(err, result) {
            console.log(result.value);
            result.value.votes--;
            res.send(result.value);
        });
    });
   
});
 
 
app.get('/jokes', function(req, res) {
 
    mongodb.connect(uri, function(err, db) {
        var collection = db.collection('jokes');
        collection.count(function(err, count) {
            var randomNumber = Math.floor(Math.random() * count);
            console.log(count + "jokes found in database.");
           
            collection.find().limit(-1).skip(randomNumber).next(
                function(err, results) {
                    console.log(results);
                    res.send(results);
                }
            );
        });
    });
});
 
app.get('/admin', function(req, res) {
   
    console.log('Attempting to add into database.');
    mongodb.connect(uri, function(err, db) {
        var collection = db.collection('jokes');
        collection.insertMany(jokes,
            function(err, results) {
                res.send(results);
                db.close();
            }
        );
    });
});