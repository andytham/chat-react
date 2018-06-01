const io = require('socket.io-client')

export default function() {
  // const socket = io.connect('http://localhost:3000')
  const socket = io();

  function message(msg, cb){
    console.log("socket msg");
    socket.emit("message", msg, cb)
  }

  function join(cb){
    socket.emit("join", cb)
  }

  return {
    message,
    join
  }
}
