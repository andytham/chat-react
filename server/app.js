const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
  console.log('user disconnected');
});
})

app.use(express.static('build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "../index.html"))
})

server.listen(PORT, (err) => {
  // if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
