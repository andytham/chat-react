const axios = require('axios');
const url = require("../server-var.js");


module.exports = function () {
  let chatHistory = [{usr: 'server', msg: 'welcome to the chatroom!', time: ''}]
  axios.get(`${url.CHAT_HISTORY_API}`).then( data => {
    chatHistory = data.data;
  }).catch(err => {
    console.log('most likely no server found');
  })

  // function broadcastMessage(message) {
  //   members.forEach(m => m.emit('message', message))
  // }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    console.log('this is entry', entry);
    axios.post(`${url.CHAT_HISTORY_API}`,
    {
      usr: entry.usr,
      msg: entry.msg,
      time: entry.time
    })
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      // console.log(err);
    })
    // console.log("added to chat history: ", chatHistory);
  }

  function getChatHistory() {
    // console.log("getting chat history: ", chatHistory);
    return chatHistory.slice()
  }

  // function addUser(client) {
  //   members.set(client.id, client)
  // }
  //
  // function removeUser(client) {
  //   members.delete(client.id)
  // }
  //
  // function serialize() {
  //   return {
  //     name,
  //     image,
  //     numMembers: members.size
  //   }
  // }

  return {
    // broadcastMessage,
    addEntry,
    getChatHistory,
    // addUser,
    // removeUser,
    // serialize
  }
}
