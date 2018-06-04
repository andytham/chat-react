import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let cssLoaded = false
import './Chatroom.css';



class Chatroom extends Component {
  constructor(props){
    super(props);
    const { chatHistory } = props
    this.state = {
       chatHistory,
       input: "",
       username: ""
    }
    this.chat = React.createRef();
    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.renderChat = this.renderChat.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(this.props.username != nextProps.username){
      this.setState({
        username: nextProps.username
      })
    }
  }
  componentDidMount(){

  }

  componentDidUpdate(){

    this.chat.current.scrollTo(0, this.chat.current.scrollHeight)
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
    this.scrollChatToBottom();
  }
  renderChat(){
    let count = 0;
    let history = (this.props.chatHistory.map(entry => {
      return (<li className="entry" key={count++}> {entry} </li>)
    }))
    return history
  }

  scrollChatToBottom() {

  }

  render() {
    console.log('chatroom render');
    console.log('current user', this.props.username);
    const poop = this.props.username
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
    return (
      <div className="chat-window">
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
    );
  }

}

export default Chatroom;
