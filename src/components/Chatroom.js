import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

let cssLoaded = false
// import './Chatroom.css';



class Chatroom extends Component {
  constructor(props){
    super(props);
    const { chatHistory } = props
    this.state = {
       chatHistory,
       input: ""
    }
    this.chat = React.createRef();
    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.renderChat = this.renderChat.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }

  componentDidMount(){}

  componentDidUpdate(){
    // const { chat } = this.refs;
    // const scrollHeight = chat.scrollHeight;
    // const height = chat.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // ReactDOM.findDOMNode(chat).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    // console.log(this.chat.current);
    // const tesNode = ReactDOM.findDOMNode(this.chat)
    //
    //   tesNode.scrollTo(0, tesNode.scrollHeight);
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
    if (cssLoaded === false) {
        cssLoaded = true;
        import('./Chatroom.css');
    }
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
