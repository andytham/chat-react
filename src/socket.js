const io = require('socket.io-client')

export default function() {
  // const socket = io.connect('http://localhost:3000')
  const socket = io();

  function receive(cb){
    socket.on('message', cb)
  }
  function message(msg, cb){
    console.log("socket msg");
    socket.emit("message", msg, cb)
  }

  function join(){
    socket.emit("join", "hmm")
  }

  function history(updateChat){

    return socket.on('history', function(hist){
      updateChat(hist)
    })
  }

  return {
    receive,
    message,
    join,
    history
  }
}
