var coap = require('coap');
var url = require('url');

var server = coap.createServer({ type: 'udp6' });

//  Handle incoming CoAP requests
server.on('request', function(req, res) {
  console.log("Received CoAP request: " + req.url);

  //  (1) Here's how to parse URL path for arguments
  var request_parts = url.parse( req.url );
  var path_arguments = request_parts.path.split("/");
  // the first "arg" is always blank due to the leading / in the URL path
  delete path_arguments[0];

  //  (2) Construct response message
  var responseMsg = "That request had " + (path_arguments.length-1) + " arguments. [ ";
  for ( a in path_arguments ) {
    responseMsg += path_arguments[a] + " ";
  }
  responseMsg += "]";

  //  (3) Send response message to CoAP clients
  console.log( "\t" + responseMsg );
  res.end(responseMsg);
});

server.listen( function() {
  // We didn't specify a host or port, the default for
  // ipv6 CoAP is [::1]:5683.
  console.log("OTA server listening on coap://[::1]:5683");
});
