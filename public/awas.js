
var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);
// When the connection is open, send some data to the server
console.log('connection . .')
connection.onopen = function () {
    console.log('opened! . .')
    
    connection.send('Ping'); // Send the message 'Ping' to the server
  };
  
  // Log errors
  connection.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };
  
  // Log messages from the server
  connection.onmessage = function (e) {
    console.log('Server: ' + e.data);
  };