import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let cssLoaded = false
import './Chatroom.css';

import { Redirect } from 'react-router-dom';
import Profile from './Profile';
import OthersProfile from './OthersProfile';
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
      loggedIn: true,
      showProfile: false
    }
    this.chat = React.createRef();
    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.renderChat = this.renderChat.bind(this)
    this.onJoin = this.onJoin.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.updateChat = this.updateChat.bind(this)
    this.manageProfile = this.manageProfile.bind(this)
  }
  componentWillReceiveProps(nextProps){
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

        console.log('this is probably running too many times');
        // if(this.state.uername != profile.nickname){
          self.setState({
            username: profile.nickname
          },
          self.onJoin(profile.nickname));
        // }
      });
    });
    lock.on("authorization_error", function(authResult){
      self.setState({
        loggedIn: false
      })
    })
  }
  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps);
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("state", this.state);
  //   console.log("nextstate",nextState);
  //   if(this.state.input != nextState.input || this.state.username != nextState.username){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  componentDidUpdate(prevProps, prevState){

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
    if(this.state.chatHistory != entry){
      this.setState({
        chatHistory: entry
      })
    }
  }

  onJoin(user){
    console.log('chatroomjs', user);
    this.state.client.join(user);
    this.getHistory();
  }

  onInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  manageProfile(getName){
    if(this.state.showProfile == true){
      if (this.state.profileName == getName){
        this.setState({
          showProfile: false,
          profileName: ""
        })
      } else {
        this.setState({
          profileName: getName
        })
      }
    } else {
      this.setState({
        showProfile: true,
        profileName: getName
      })
    }
  }

  onSendMessage(){
    if (!this.state.input) {
      console.log('no text entered');
      return
    }
    this.state.client.message({
      usr: this.state.username, msg: this.state.input
    }, (err) => {
      return console.log(err);
    })
    this.setState({ input: ''})
  }

  renderChat(){
    let count = 0;
    console.log('rendering chat');
    let history = (this.state.chatHistory.map(entry => {
      if(entry.usr == "server"){
        return (
          <li className="entry" key={count++}>
            <span className="green">{entry.usr}</span>: <span className="grey" >{entry.msg} </span>
          </li>
        )
      } else
      return (
        <li className="entry" key={count++}>
          {this.state.username == entry.usr
            ? <span className="red">{entry.usr}</span>
            :<span className="blue" onClick={() => this.manageProfile(entry.usr)}>{entry.usr}</span>
          }
          : {entry.msg}
        </li>
      )
    }))
    return history
  }

  render() {
    // console.log(this.state);
    // console.log('why is this so slow');
    if (this.state.loggedIn && this.state.username) {
      return(
        <div className="chatroom">
          <div className="chat-window chat-width"> 
            <div className="chat-title"></div>
            <ul className="chat-history" ref={this.chat}>
                {this.state.chatHistory ? this.renderChat() : "loading..."}
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
          <div className="profiles">
            <Profile  username={this.state.username}/>
              {this.state.showProfile ? <OthersProfile username={this.state.profileName }/> : ""}
          </div> 
        </div>
      )
    } else if (this.state.loggedIn){
      let myStorage = window.localStorage;
      console.log(JSON.parse(myStorage.profile).nickname);
      this.setState({
        username: JSON.parse(myStorage.profile).nickname
      })
      return (<div className="redirect">Redirecting...</div>)
    } else { return <Redirect to="/" /> }

  }

}

export default Chatroom;
