const io = require('socket.io-client');


// var http = require('http');
// var server=http.createServer(function(req,res){
//     res.writeHead(200);
//     res.end("Hello world");
// });
// server.listen(7000,function(){
// console.log('Server running on port 7000')
// });
// const app = require('express')();
// var server = http.createServer(app);
// const io = require('socket.io')(server);



app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});



io.on('connection', (socket) => {
  
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message from socket: ' + msg);
  });

});