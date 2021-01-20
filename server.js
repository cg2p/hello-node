require('dotenv').config();

var http = require('http');

const port = 3000;

const myvar = process.env.MYVAR || 'default';

var server = http.createServer(function(req, res) {
  console.log("ping");
  const message = '<p>Hello World !</p>' + '<p> env var - myvar = ' + myvar + '</p>';
  res.writeHead(200);
  res.end(message);
});

server.listen(port, () => {
  console.log("server startup - MYVAR = ", myvar);
  console.log(`Server listening on ${port}`);
});