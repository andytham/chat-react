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
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
    
        // document.getElementById('nick').textContent = profile.nickname;
    
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }

  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  // login() {
  //   this.props.auth.login();
  // }

  // logout() {
  //   this.props.auth.logout();
  // }


  getHistory(){
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
      username: username,
      loginSuccess: true
    }, () => {
      console.log(this.state.username, 'this is state app');
      
      this.props.history.push({
        pathname: "/chat",
        state: { username: this.state.username }
      });
    })
    // console.log(this.state.username, 'appjs username');
  }

  render(){
    // auth.login();
    // lock.show();
    self = this;
    lock.on("authenticated", function(authResult) {
			// Use the token in authResult to getUserInfo() and save it to localStorage
			lock.getUserInfo(authResult.accessToken, function(error, profile) {
				if (error) {
					// Handle error
					return;
        }
        
        console.log('authenticated as: ', profile.nickname)
        console.log(authResult.accessToken);
        self.onSuccess(profile.nickname)
        
				// document.getElementById('nick').textContent = profile.nickname;
		
				localStorage.setItem('accessToken', authResult.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));
			});
		});
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
        <div id="auth" className="App">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...this.props} loginSuccess={this.state.loginSuccess} />} />
            <Route exact path="/login" render={() => <AuthComponent onSuccess={this.onSuccess}/>} />
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
    )
  }

}

export default withRouter(App);
