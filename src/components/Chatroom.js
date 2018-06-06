import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let cssLoaded = false
import './Chatroom.css';

import { Redirect } from 'react-router-dom';
import Profile from './Profile';

class Chatroom extends Component {
  constructor(props){
    super(props);
    const { chatHistory } = props
    this.state = {
       chatHistory,
       input: "",
       username: "",
       loggedIn: true
    }
    this.chat = React.createRef();
    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.renderChat = this.renderChat.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    if(this.props.username != nextProps.username){
      this.setState({
        username: nextProps.username
      })
    } else if (this.props.username == ""){
      this.setState({
        loggedIn: false
      })
    }
  }
  componentDidMount(){
  }

  componentDidUpdate(){
    if(this.state.username){
      this.chat.current.scrollTo(0, this.chat.current.scrollHeight)
    }
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
    this.props.onSendMessage({user: this.state.username, msg: this.state.input}, (err) => {
      if (err){
        return console.error(err)}
      return this.setState({ input: '' })
    })
    this.setState({ input: ''})
    this.scrollChatToBottom();
  }
  renderChat(){
    let count = 0;
    let history = (this.props.chatHistory.map(entry => {
      return (<li className="entry" key={count++}>
        {this.state.username == entry.user ? <span className="red">{entry.user}</span>:<span className="blue">{entry.user}</span>}: {entry.msg} </li>)
    }))
    return history
  }

  scrollChatToBottom() {

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
