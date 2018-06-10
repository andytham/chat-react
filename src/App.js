import React from 'react';
import Chatroom from './components/Chatroom';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import socket from './socket.js';
import './App.css';
import './components/Chatroom.css';

import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

import Auth from './Auth/Auth.js';
import AuthComponent from './AuthComponent';
import lock from './auth-config.js';

import Home from './components/Home';
class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      client: socket(),
      chatHistory: [],
      username: "",
      loginSuccess: false
    }

    this.onSuccess = this.onSuccess.bind(this)
  }
  componentDidMount(){}

  onSuccess(username){
    this.setState({
      username: username,
      loginSuccess: true
    })
  }

  render(){
    const ChatroomComponent = () => {
      <Chatroom
        chatHistory={this.state.chatHistory}
        onSendMessage={
          this.onSendMessage}
      />
    }

    return(
        <div id="auth" className="App">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...this.props} loginSuccess={this.state.loginSuccess} />} />
            <Route exact path="/login" render={() => <AuthComponent onSuccess={this.onSuccess}/>} />
            <Route exact path="/chat" render={() =>  <Chatroom
            />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" render={() => <Profile username={this.state.username}/>} />
          </Switch>
        </div>
    )
  }

}

export default withRouter(App);
