import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let cssLoaded = false
import './Chatroom.css';

import { Redirect } from 'react-router-dom';
import Profile from './Profile';
import lock from '../auth-config';
import socket from '../socket.js';


class Chatroom extends Component {
  constructor(props){
    super(props);
    const { chatHistory } = props
    this.state = {
      client: socket(),
      chatHistory,
      input: "",
      username: "",
      loggedIn: true
    }
    this.chat = React.createRef();
    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.renderChat = this.renderChat.bind(this)
    this.onJoin = this.onJoin.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.updateChat = this.updateChat.bind(this)
  }
  componentWillReceiveProps(nextProps){
    // if(this.props.username != nextProps.username){
    //   console.log('yea');
      
    //   this.setState({
    //     username: nextProps.username
    //   })
    // } else if (this.props.username == ""){
    //   console.log('no');
      
    //   this.setState({
    //     loggedIn: false
    //   })
    // }
  }
  componentDidMount(){
    let self = this
    lock.on("authenticated", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        self.setState({
          username: profile.nickname
        });
      });
    });
    lock.on("authorization_error", function(authResult){
      console.log(authResult);
      console.log('not signed in');
      self.setState({
        loggedIn: false
      })
    })
    this.onJoin();
  }

  componentDidUpdate(){
    //receive response back from socket
    this.state.client.receive(this.updateChat)

    //scroll chat to the bottom
    if(this.state.username){
      this.chat.current.scrollTo(0, this.chat.current.scrollHeight)
    }
  }

  getHistory(){
    this.state.client.history(this.updateChat)
  }

  updateChat(entry){
    this.setState({
      chatHistory: entry
    })
  }

  onJoin(){
    this.state.client.join();
    this.getHistory();
  }

  onInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  onSendMessage(){
    if (!this.state.input) {
      console.log('no text entered');
      return
    }
    this.state.client.message({
      user: this.state.username, msg: this.state.input
    }, (err) => {
      return console.log(err);
    })
    this.setState({ input: ''})
  }

  renderChat(){
    let count = 0;
    let history = (this.state.chatHistory.map(entry => {
      return (<li className="entry" key={count++}>
        {this.state.username == entry.user ? <span className="red">{entry.user}</span>:<span className="blue">{entry.user}</span>}: {entry.msg} </li>)
    }))
    return history
  }

  render() {
    // console.log('chatroom render');
    // console.log('current user', this.props.username);
    // const poop = this.props.username
    // console.log(poop);
    // this.setState({
    //   username: poop
    // })
    // console.log(this.state.username, 'state ussername');
    // if(!this.state.username){
    //   this.setState({
    //     username: this.props.username
    //   })
    // }
    if (this.state.loggedIn && this.state.username) {
      return(
        <div className="chat-window">
          <Profile  username={this.state.username}/>
          <div className="chat-title"></div>
          <ul className="chat-history" ref={this.chat}>
              {this.state.chatHistory ? this.renderChat() : "loading"}
          </ul>
          <div className="input-wrapper">
            <TextField
              className="chat-input"
              autoFocus={true}
              placeholder="Enter a message."
              rows={4}
              rowsMax={4}
              onChange={this.onInput}
              value={this.state.input}
              onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
            />
            <Button className="enter-msg" onClick={this.onSendMessage}>
              Enter
            </Button>
          </div>
        </div>
      )
    } else if (this.state.loggedIn){
      return (<div>Redirecting...</div>)
    } else { return <Redirect to="/" /> }

  }

}

export default Chatroom;