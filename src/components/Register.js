import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
class Register extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      password2: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.usernameInput = this.usernameInput.bind(this)
    this.passwordInput = this.passwordInput.bind(this)
    this.passwordInput2 = this.passwordInput2.bind(this)
  }

  usernameInput(e){
    this.setState({
      username: e.target.value
    })
  }

  passwordInput(e){
    this.setState({
      password: e.target.value
    })
  }
  passwordInput2(e){
    this.setState({
      password2: e.target.value
    })
  }
  onSubmit(){

    if(!this.state.password || !this.state.password2 || !this.state.username){
      console.log(`username/password required`);
    } else if(this.state.password != this.state.password2){
      console.log('passwords mismatch');
    } else {
      axios.post('http://localhost:8080/users', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }


  render() {
    return (
      <div>
        <TextField
          label="username"
          // placeholder="username"
          rows={1}
          onChange={this.usernameInput}
          value={this.state.username}
          onKeyPress={e => (e.key === 'Enter' ? this.onSubmit() : null)}
        />
        <br/>
        <TextField
          label="password"
          // placeholder="password"
          type="password"
          rows={1}
          onChange={this.passwordInput}
          value={this.state.password}
          onKeyPress={e => (e.key === 'Enter' ? this.onSubmit() : null)}
        />
        <br/>
        <TextField
          label="re-enter your password"
          // placeholder="password"
          type="password"
          rows={1}
          onChange={this.passwordInput2}
          value={this.state.password2}
          onKeyPress={e => (e.key === 'Enter' ? this.onSubmit() : null)}
        />
      </div>
    );
  }

}

export default Register;
