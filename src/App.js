import React from 'react';
import Chatroom from './components/Chatroom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import socket from './socket.js';
import './App.css';
import './components/Chatroom.css';

import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      client: socket(),
      chatHistory: [],
      username: ""
    }
    // this.renderChat = this.renderChat.bind(this)
    this.panel = React.createRef();
    this.onJoin = this.onJoin.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.updateChat = this.updateChat.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
  }
  componentDidMount(){
    this.onJoin();
  }

  getHistory(){
    console.log('getting history');
    this.state.client.history(this.updateChat)
  }

  updateChat(entry){
    this.setState({
      chatHistory: entry
    })
  }

  componentDidUpdate(){
  }
  onJoin(){
    this.state.client.join();
    this.getHistory();
  }

  onSendMessage(msg, cb){
    this.state.client.message(msg, cb)
    this.state.client.receive(this.updateChat)
  }

  onSuccess(username){
    console.log("sucess");
    this.setState({
      username: username
    })
    // console.log(this.state.username, 'appjs username');
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
    const ChatroomComponent = () => {
      <Chatroom
        chatHistory={this.state.chatHistory}
        onSendMessage={
          this.onSendMessage}
      />
    }
    // console.log("app js is rendering");
    // console.log("APP STATE", this.state);
    return(
      <BrowserRouter>
        <div className="App">
          {/* <MuiThemeProvider>
            <Chatroom
              chatHistory={chatHistory}
              onSendMessage={ (msg, cb) => this.state.client.message(msg, cb)}
            />

          </MuiThemeProvider> */}

          <Switch>
            <Route exact path="/" render={() => <Login onSuccess={this.onSuccess} />} />
            <Route exact path="/chat" render={() =>  <Chatroom
              chatHistory={this.state.chatHistory}
              onSendMessage={
                this.onSendMessage}
              username={this.state.username}
            />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" render={() => <Profile username={this.state.username}/>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
