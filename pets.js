var fs = require('fs')

if (process.argv[2] == 'read') {
	read()
} else if (process.argv[2] == 'create') {
	create()
} else if (process.argv[2] == 'update') {
	update()
} else if (process.argv[2] == 'destroy') {
	destroy()
} else {
	console.log("Usage: node pets.js [read | create | update | destroy")
}

function read() {

	var filePath = './pets.json'
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			throw err
		};

		var parsedData = JSON.parse(data)

		if (!process.argv[3]) {
			console.log(parsedData)
		}

		if (process.argv[3]) {
			var targetIndex = process.argv[3];
			if (targetIndex >= parsedData.length) {
				console.log('Usage: node pets.js read INDEX')
			} else {
				console.log(parsedData[targetIndex])
			}
		}
	})
}

function create() {
	console.log('creating')
	var newPet = {}
	if (process.argv[5]) {
		var age = Number(process.argv[3])
		var kind = process.argv[4]
		var name = process.argv[5]
		newPet["age"] = age,
			newPet["kind"] = kind,
			newPet["name"] = name
	} else {
		console.log('Usage: node pets.js create AGE KIND NAME')
	}
	console.log(newPet)


	fs.readFile('./pets.json', 'utf8', (err, data) => {
		if (err) {
			throw err
		};
		console.log(data)
		var parsedData = JSON.parse(data);
		console.log(parsedData)
	})

	fs.writeFile('./pets.json', JSON.stringify(newPet), (err) => {
		if (err) {
			console.log(err)
		}
	})
}

function update() {
	console.log('updating')
}

function destroy() {
	console.log('destroying')
}