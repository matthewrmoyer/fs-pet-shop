const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const pets = require('./pets.json')
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.listen(PORT, () => {
	console.log('listening on ' + PORT)
})

app.get('/pets', (req, res) => {
	res.status(200)
	res.set('Content-Type', 'application/json')
	res.send(JSON.stringify(pets));
})

app.get('/pets/:id', (req, res) => {
	const id = req.params.id;
	if (id >= pets.length) {
		res.set('Content-Type', 'text/plain')
		res.status(404)
		res.end("Not Found");
	} else if (id < 0) {
		res.set('Content-Type', 'text/plain')
		res.status(404)
		res.end("Not Found");
	} else {
		res.status(200)
		res.set('Content-Type', 'application/json')
		res.send(JSON.stringify(pets[id]))
	}
})

module.exports = app