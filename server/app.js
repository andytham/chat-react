const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const Chatroom = require('./Chatroom.js');

io.on('connection', function(socket){

  socket.on('join', function(callback){
    callback(Chatroom().getChatHistory());
  })

  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');

  });
  socket.on('message', function(msg){
    console.log('message: ' + msg);
    io.emit('message', handleMsg);
    Chatroom().addEntry(msg)
  });

})

app.use(express.static('build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "../index.html"))
})
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"))
})
server.listen(PORT, (err) => {
  // if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
