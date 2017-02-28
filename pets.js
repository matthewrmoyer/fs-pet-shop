
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
	console.log('reading')
}

function create() {
	console.log('creating')
}

function update() {
	console.log('updating')
}

function destroy(){
	console.log('destroying')
}