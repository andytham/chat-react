module.exports = function () {
  let chatHistory = ['welcome to the chatroom!']

  // function broadcastMessage(message) {
  //   members.forEach(m => m.emit('message', message))
  // }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    console.log("added to chat history: ", chatHistory);
  }

  function getChatHistory() {
    console.log("getting chat history: ", chatHistory);
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
