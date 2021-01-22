require('dotenv').config();

var http = require('http');

const port = process.env.SERVER_PORT || 3000;

const myvisvar = process.env.MYVISIBLEVAR || 'default';
const mysecretvar = process.env.MYSECRETVAR || 'unset';

var server = http.createServer(function(req, res) {
  console.log("ping");
  const message = 
    '<p>Hello World !</p>' + 
    '<p> Env Vars:</p>' + 
    '<p> MYVISIBLEVAR=' + myvisvar + '</p>' +
    '<p> MYSECRETVAR=' + mysecretvar + '</p>';
  res.writeHead(200);
  res.end(message);
});

server.listen(port, () => {
  console.log("Server startup");
  console.log("- env MYVISIBLEVAR=%s", myvisvar);
  console.log("- env MYSECRETVAR=%s", mysecretvar);
  console.log("Server listening on %s", port);
});