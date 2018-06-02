import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

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
}

  onInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  onSendMessage(){
    console.log("onsend func running");
    if (!this.state.input) {
      console.log('no text entered');
      return
    }

    this.props.onSendMessage(this.state.input, (err) => {
      console.log("callback running");
      if (err){
        console.log('error');
        return console.error(err)}
      return this.setState({ input: '' })
    })
  }

  render() {
    return (
      <div className="chatroom">
        <ul className="chat-history">

        </ul>
        <TextField
          textareaStyle={{ color: '#fafafa' }}
          hintStyle={{ color: '#fafafa' }}
          floatingLabelStyle={{ color: '#fafafa' }}
          hintText="Enter a message."
          floatingLabelText="Enter a message."

          rows={4}
          rowsMax={4}
          onChange={this.onInput}
          value={this.state.input}
          onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
        />
      </div>
    );
  }

}

export default Chatroom;
