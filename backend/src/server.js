//import express
const express = require('express');
//create express server
const app = express();


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//when it receives a request to go to localhost:3000
app.get('/', (req, res) => {
    res.send('An alligator approaches!'); //send this
});

app.post('/login', (req, res) => {
	console.log(req.body);
	res.send("you're logging in!");
});

app.post('/signup', (req, res) => {
	console.log(req.body);
	res.send("you're logging in!");
});

//create a listener in this port
app.listen(3001, () => console.log('Ringo server listening on port 3001!'));


// get request is when you want something from the server
// post request is when you are giving the server info