//import express
const express = require('express');
//create express server
const app = express();
const db = require('./db')
const authentication = require('./authentication')
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}
app.use(cors(corsOptions))

db.connect()

//when it receives a request to go to localhost:3000
app.get('/', (req, res) => {
    res.send('An alligator approaches!'); //send this
});

app.post('/login', async (req, res) => {
	const username = req.body.username
	const password = req.body.password
	const status = await db.login(username, password)
	if (status === 200)
		res.send({token: authentication.generateAccessToken(username)})
	else
		res.sendStatus(status)
});

app.post('/validate-token', authentication.authenticateToken, async (req, res) => {
	res.send({ username: req.username })
})

app.post('/signup', async (req, res) => {
	console.log('USER TRYING TO SIGNUP');
	
	const {username, password, passwordConfirmation, email} = req.body
	const status = await db.signup(username, password, passwordConfirmation, email)
	if (status === 200)
		res.send({token: authentication.generateAccessToken(username)})
	else
		res.sendStatus(status)
});

app.get('/discover', async (req, res) => {

})

app.get('/my-patches', authentication.authenticateToken, async (req, res) => {
	const patches = await db.getMyPatches(req.username)
	res.send(patches)
})

app.post('/new-patch', authentication.authenticateToken, async (req, res) => {		
	const status = await db.newPatch(req.username)
	res.sendStatus(status)
})

app.post('/update-patch-name', authentication.authenticateToken, async (req, res) => {		
	const patchID = req.body.patchID
	const newPatchName = req.body.newPatchName	
	db.updatePatchName(patchID, newPatchName)
})

app.post('/update-patch', authentication.authenticateToken, async (req, res) => {
	console.log(req.body);
	await db.updatePatch(req.body.id, req.body.patchData)
	res.sendStatus(200)

})

app.get('/patch', authentication.authenticateToken, async (req, res) => {
	const patch = await db.getPatch(req.query.id)
	res.send(patch)
})

//create a listener in this port
app.listen(3001, () => console.log('Ringo server listening on port 3001!'));

// get request is when you want something from the server
// post request is when you are giving the server info