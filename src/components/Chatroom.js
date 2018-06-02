import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';
// import './Chatroom.css';
const ChatWindow = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 420px;
  box-sizing: border-box;
  border: 1px solid black;
`

const ChatHistory = styled.ul`
  list-style-type: none;
`

class Chatroom extends Component {
  constructor(props){
    super(props);
    const { chatHistory } = props
    this.state = {
       chatHistory,
       input: ""
    }
    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.renderChat = this.renderChat.bind(this)
  }

  componentDidMount(){

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

    this.props.onSendMessage(this.state.input, (err) => {
      if (err){
        return console.error(err)}
      return this.setState({ input: '' })
    })
    this.setState({ input: ''})
  }
  renderChat(){
    let count = 0;
    let history = (this.props.chatHistory.map(entry => {
      return (<li key={count++}> {entry} </li>)
    }))
    return history
  }

  render() {
    return (
      <ChatWindow className="chatroom">
        <ChatHistory>
        <ul className="chat-history">
          {this.state.chatHistory ? this.renderChat() : "loading"}
        </ul>
      </ChatHistory>
        <TextField

          autoFocus={true}
          placeholder="Enter a message."

          rows={4}
          rowsMax={4}
          onChange={this.onInput}
          value={this.state.input}
          onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
        />
      </ChatWindow>
    );
  }

}

export default Chatroom;
