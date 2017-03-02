const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const db = low('./pets.json', {
	storage: fileAsync
})
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

app.post('/pets', (req, res) => {
	var newPet = req.body
		// res.set('Content-Type', 'application/json')
		// res.status(200)
	if (!newPet.age || !newPet.kind || !newPet.name) {
		res.set('Content-Type', 'text/plain')
		res.status(400)
		res.send("Bad Request")
		res.end()
	} else {

		var age = parseInt(newPet.age, 10)
		var kind = newPet.kind
		var name = newPet.name

		var newPetObject = {
			age: age,
			kind: kind,
			name: name
		}
		db.identity()
			.push(newPetObject)
			.write()
			.then(function() {
				res.set('Content-Type', 'application/json')
				res.status(200)
				res.send(newPetObject)
			})
			.catch(err => {
				console.log(err)
				res.set('Content-Type', 'text/plain')
				res.status(400)
				res.end("Bad Request")
			})
	}
	// res.send(newPet)

})

app.delete('/pets/:id', (req, res) => {
	var indexToDelete = req.params.id;
	console.log("deletingggg")
	db.identity()
		.remove(pets[indexToDelete])
		.write()
		.then(function() {
			res.set('Content-Type', 'application/json')
			res.status(200)
			res.send(db)
		})
		.catch(err => {
			console.log(err)
		})
})

app.patch('/pets/:id', (req, res) => {
	var indexToPatch = req.params.id
	console.log(indexToPatch)
	console.log(req.body.name)
	var newPetObject;

	if (req.body.age && req.body.kind && req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: age,
			kind: kind,
			name: name
		}
	}

	if (req.body.age && req.body.kind && !req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: age,
			kind: kind,
			name: pets[indexToPatch]['name']
		}
	}


	if (req.body.age && !req.body.kind && req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: age,
			kind: pets[indexToPatch]['kind'],
			name: name
		}
	}


	if (!req.body.age && req.body.kind && req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: pets[indexToPatch]['age'],
			kind: kind,
			name: name
		}
	}

	if (req.body.age && !req.body.kind && !req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: age,
			kind: pets[indexToPatch]['kind'],
			name: pets[indexToPatch]['name']
		}
	}


	if (!req.body.age && req.body.kind && !req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: pets[indexToPatch]['age'],
			kind: kind,
			name: pets[indexToPatch]['name']
		}
	}

	if (!req.body.age && !req.body.kind && req.body.name) {

		var age = parseInt(req.body.age, 10)
		var kind = req.body.kind
		var name = req.body.name

		var newPetObject = {
			age: pets[indexToPatch]['age'],
			kind: pets[indexToPatch]['kind'],
			name: name
		}
	}


	db.identity()
		.find(pets[indexToPatch])
		.assign(newPetObject)
		.write()
		.then(function(data) {
			res.send(data)
		})

})

module.exports = app