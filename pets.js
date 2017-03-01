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
	console.error("Usage: node pets.js [read | create | update | destroy]")
	process.exit(1)
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
				console.error('Usage: node pets.js read INDEX')
				process.exit(1)
			} else {
				console.log(parsedData[targetIndex])
			}
		}
	})
}

function create() {
	var newPet = {}
	if (process.argv[5]) {
		var age = Number(process.argv[3])
		var kind = process.argv[4]
		var name = process.argv[5]
		newPet["age"] = age,
		newPet["kind"] = kind,
		newPet["name"] = name
	} else {
		console.error('Usage: node pets.js create AGE KIND NAME')
		process.exit(1)
	}

	fs.readFile('./pets.json', 'utf8', (err, data) => {
		if (err) {
			throw err
		};
		//data.push(newPet)


		var parsedData = JSON.parse(data)
			// console.log(parsedData[0])
		parsedData.push(newPet)
		var stringified = JSON.stringify(parsedData)


		fs.writeFile('./pets.json', stringified, (err) => {
			if (err) {
				console.log(err)
			}
		})

	})


}

function update() {
	console.log('updating')
}

function destroy() {
	console.log('destroying')
}