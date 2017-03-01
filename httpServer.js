var http = require('http')
const PORT = 8080
var HttpDispatcher = require('httpdispatcher')
var dispatcher = new HttpDispatcher()

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


 dispatcher.onGet("/page1", function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('asdfasf');
        console.log('asdfadf')
        res.end('Page One');
    }); 