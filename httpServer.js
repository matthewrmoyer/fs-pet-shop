const http = require('http')
const PORT = 8080
const pets = require('./pets.json')


var server = http.createServer(function(req, res) {
	const index = req.url.split("/").pop();
	console.log("Server is listening at " + index)

	// res.end(JSON.stringify(pets));
	// 		res.end(JSON.stringify(pets[0]));
	if (index == "pets") {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(JSON.stringify(pets));

	} else if (index < 0) {
		res.writeHead(404, {
			"Content-Type": "text/plain"
		});
		res.write("Not Found");
		res.end();
	} else if (index >= pets.length) {
		res.writeHead(404, {
			"Content-Type": "text/plain"
		});
		res.write("Not Found");
		res.end();

	} else if (index == "1") {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(JSON.stringify(pets[1]));
	} else if (index == "0") {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(JSON.stringify(pets[0]))
	} else {
		res.writeHead(200, {
			"Content-Type": "application/json"
		})
		res.end(JSON.stringify(pets))
	}


});

server.listen(PORT, function() {
	console.log("Server is listening")
})


module.exports = server;