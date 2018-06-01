import React from 'react';
import Chatroom from './components/Chatroom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import socket from './socket.js';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      client: socket()
    }
    // this.renderChat = this.renderChat.bind(this)
    this.onJoin = this.onJoin.bind(this)
    this.getHistory = this.getHistory.bind(this)
  }
  getHistory(){
    console.log('getting history');
    this.state.client.history();
  }

  componentDidMount(){
  }

  onJoin(){
    this.state.client.join();
    this.getHistory();
  }


  // onJoin(success){
  //   return this.state.client.join(chatHistory => {
  //     return success(chatHistory)
  //   })
  // }
  // renderChat({ history }){
  //   console.log("hey fuckin render");
  //   if (!history.location.state){
  //     console.log("nada");
  //     history.push({state: {chatHistory: []}})
  //   }
  //   const { chatHistory } = history.location.state;
  //   return (
  //     <Chatroom
  //       chatHistory={chatHistory}
  //       onSendMessage={ (msg, cb) => this.state.client.message(msg, cb)}
  //     />
  //   )
  // }

  render(){
    if(this.state.client){
      console.log('getting history');
      this.onJoin()
    } else {
      console.log('waiting for client')
    }
    console.log("app js is rendering");
    return(
      <BrowserRouter>
        <div className="App">
          chatroom below
          {/* <MuiThemeProvider>
            <Chatroom
              chatHistory={chatHistory}
              onSendMessage={ (msg, cb) => this.state.client.message(msg, cb)}
            />

          </MuiThemeProvider> */}
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
