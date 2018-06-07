import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import './form.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: 'guest',
      password: 'guest',
      loginSuccess: false,
      error: "",
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.usernameInput = this.usernameInput.bind(this)
    this.passwordInput = this.passwordInput.bind(this)
  }

  onSubmit(){
    let self = this;
    axios.get(`${process.env.API_SERVER}/users/name/${this.state.username}`)
    .then(data => {
      if(data.data.username == this.state.username && data.data.password == this.state.password){
        this.setState({loginSuccess: true})
        this.props.onSuccess(this.state.username)
      } else {
        self.setState({
          error: 'Username and password do not match.'
        })
      }
    })
    .catch(err => {
      self.setState({
        error: 'Login attempt unsuccessful.'
      })
      console.log(err);
    })
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

  render() {
    if(this.state.loginSuccess){
      return <Redirect to='/chat'/>;
    }
    return (
      <div className="login">
        <div className="login-form form">
          <TextField
            label="username"
            autoFocus
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
        </div>
        <div className="login-buttons buttons">
          <Button onClick={this.onSubmit}>Login</Button>
          <Button href="/register">Register</Button>
        </div>
        <div className="error">
          {this.state.error}
        </div>
      </div>
    );
  }

}

export default Login;
