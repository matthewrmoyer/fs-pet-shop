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
	var file = './pets.json'
	var contents = fs.readFileSync(file).toString();
	var parsedContents = JSON.parse(contents);

	if (!process.argv[3]) {
		console.log(parsedContents)
	}
	if (process.argv[3]) {
		if (process.argv[3] > parsedContents.length) {
			console.log('Usage: node pets.js read INDEX')
		} else {
			var targetObject = parsedContents[process.argv[3]]
			console.log(targetObject)
		}
	}
}

function create() {
	console.log('creating')
}

function update() {
	console.log('updating')
}

function destroy() {
	console.log('destroying')
}