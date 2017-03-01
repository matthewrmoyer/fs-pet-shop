var http = require('http')
const PORT = 8080



var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write("Hello World!");
	res.end();
})

server.listen(PORT, function() {
	console.log("Server is listening")
})


module.exports = server;

