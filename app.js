var express = require('express');
var bodyParser  = require('body-parser');
var cors = require('cors');
var app = express();
var port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyParser.json());



app.get('/', function(req, res) {

	console.log('GET received on Route: /');

	res.sendFile(__dirname + '/public/events.html');

});


app.get('/newevent/:appId/:eventId/:message', function(req, res) {

	console.log('Event Data received on Route: /newevent:');

	var event = {};

	event.appId = req.params.appId;
	event.eventId = req.params.eventId;
	event.message = req.params.message;

	console.log(JSON.stringify(event));

	res.json('OK');
});


app.get('/formdata/:data', function(req, res) {
  
	console.log('GET received on Route: /formdata/');

	var formData = req.params.data;
	  
	console.log(formData);

	 res.send(JSON.stringify("OK"));

});

app.post('/', function(req, res) {
  
	var formData = req.body;
    
    console.log('Post received on Route: /');

	console.log(JSON.stringify(formData));
	
	//console.log(JSON.parse(Object.keys(formData)[0]));

  	res.send(JSON.stringify("Post OK"));

});


app.listen(port);

console.log("App listening: " + port);