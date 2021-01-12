var http = require('http');

const port = 3000;

var server = http.createServer(function(req, res) {
  console.log("ping");
  res.writeHead(200);
  res.end('Hello World !');
});
//server.listen(port);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
