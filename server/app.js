const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const cr = require('./Chatroom.js');
let Chatroom = cr();
let usersList = {};
io.on('connection', function(socket){



  //when user joins the server
  socket.on('join', function(user){

    io.emit('history', Chatroom.getChatHistory())

    if(user){
      console.log(user, "has joined");
      Chatroom.addEntry({usr: "server", msg: `${user} has joined the server`})
      io.emit('message', Chatroom.getChatHistory())
      usersList[socket.id] = user
    }


  })



  socket.on('disconnect', function(){
    if(usersList[socket.id]){
      console.log(usersList[socket.id], 'user disconnected');
      Chatroom.addEntry({usr: "server", msg: `${usersList[socket.id]} has disconnected.`})
      io.emit('message', Chatroom.getChatHistory())
    }
  });

  socket.on('message', function(msg){
    console.log('message: ' + msg);
    Chatroom.addEntry(msg)
    io.emit('message', Chatroom.getChatHistory());
  });


})

app.use(express.static('build'));
app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname + "../index.html"))
})

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})
app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})
// app.get('/chat', (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"))
// })
server.listen(PORT, (err) => {
  // if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
