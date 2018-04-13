const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const shell = require('node-powershell');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyParser.json());

let ps = new shell({
	executionPolicy: 'Bypass',
	noProfile: true
  });



app.get('/', function(req, res) {

	console.log('GET received on Route: /');

	res.sendFile(__dirname + '/public/events.html');

});


app.get('/events', function(req, res){
	 
	ps.addCommand('.\\getEvents.ps1 99');
	ps.invoke()
	.then(output => {
	//console.log(output);

	var events = JSON.parse(output);
	//ps.dispose();

	console.log('Parsed Object ----------------\n');

	for (let i = 0; i < events.length; i++) {

		console.log('MachineName: ' + events[i].MachineName + ' appId: ' + events[i].Source + ' eventId: ' + events[i].EventID);
		console.log('    message: ' + events[i].Message);
		console.log();
		
	}

	res.json(events);

	})
	.catch(err => {
		console.log(err);
		ps.dispose();
		res.json('Error');
	});


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


app.post('/', function(req, res) {
  
	var formData = req.body;
    
    console.log('Post received on Route: /');

	console.log(JSON.stringify(formData));
	
	//console.log(JSON.parse(Object.keys(formData)[0]));

  	res.send(JSON.stringify("Post OK"));

});


app.listen(port);

console.log("App listening: " + port);