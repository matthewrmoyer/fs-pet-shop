const http = require('http')
const PORT = 8080
const pets = require('./pets.json')


var server = http.createServer(function(req, res) {
	const index = req.url.split("/").pop();
	console.log("Server is listening at " + index)
	res.writeHead(200, {
			"Content-Type": "application/json"
		})
		// res.end(JSON.stringify(pets));
		// 		res.end(JSON.stringify(pets[0]));
	if (index == "pets") {
		res.end(JSON.stringify(pets));

	} else if (index == "1") {
		res.end(JSON.stringify(pets[1]));
	} else if (index == "0") {
		res.end(JSON.stringify(pets[0]))
	} else{
		res.end(JSON.stringify(pets))
	}


});

server.listen(PORT, function() {
	console.log("Server is listening")
})


module.exports = server;