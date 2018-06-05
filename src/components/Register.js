import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import './form.css';
class Register extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      password2: '',
      redirect: false
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
      this.setState({
        error: "Username/password required."
      })
    } else if(this.state.password != this.state.password2){
      this.setState({
        error: "Passwords mismatch."
      })
    } else {
      self = this;
      axios.get(`http://localhost:8080/users/name/${this.state.username}`)
      .then(data => {
        this.setState({
          error: `Username ${data.data.username} already exists.`
        })
      })
      .catch(err => {

        axios.post('http://localhost:8080/users', {
          username: this.state.username,
          password: this.state.password
        })
        .then(function (response) {
          // console.log(response);
          self.setState({
            redirect: true
          })
        })
        .catch(function (error) {
          console.log(error);
        })
        // console.log(err);
      })


    }

  }


  render() {
    if (this.state.redirect){
      return (<Redirect to="/" />)
    }
    return (
      <div className="register">
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
        <div>
          <Button onClick={this.onSubmit}>Register</Button>
          <Button href="/">Back</Button>
        </div>
        <div>
          {this.state.error}
        </div>
      </div>
    );
  }

}

export default Register;
