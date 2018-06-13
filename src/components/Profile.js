import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import './Profile.css';
import { Redirect } from 'react-router-dom';
import url from "../../server-var.js";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      input: "",
      redirect: false,
      bio: ""
    }
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.nameInput = this.nameInput.bind(this)
  }
  componentDidMount(){
    try {
      axios.get(`${url.PROFILES_API}/name/${this.props.username}`)
      .then(data => {
        
        this.setState({
          bio: data.data.bio,
          input: data.data.bio
        })
      
      })
      .catch(err => {
        console.log(err);
        axios.post(`${url.PROFILES_API}`,
        {
          nickname: this.props.username,
          bio: ""
        }).then( res => {
          console.log('created new entry');
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      })
    } catch (error) {

    }

  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
    // if(this.props.username != nextProps.username){
    // }
  }

  onSave(){
    this.setState({
      editing: false,
    })
    self = this;
    axios.patch(`${url.PROFILES_API}/name/${this.props.username}`, {
      bio: this.state.input
    })
    .then(()=>{
      console.log('patch success');
      self.setState({
        bio: this.state.input
      })
    })
    .catch(err=>{console.log(err);})
  }
  onDelete(){
    self = this;
    axios.patch(`${url.PROFILES_API}/name/${this.props.username}`, {
      bio: ""
    })
    .then(()=>{
      console.log('patch success');
      self.setState({
        input: "",
        bio: ""
      })
      self.onSave();
    })
    .catch(err=>{
      console.log(err);
      self.setState({
        input: "",
        bio: ""
      })
      self.onSave();
    })
  }
  onEdit(){
    this.setState({
      editing: true
    })
  }
  nameInput(e){
    this.setState({
      input: e.target.value
    })
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/"/>
    }
    return (
      <div className="profile chat-width">
        <div className="profile-name">
          <span className="status">Logged in as: </span>{this.props.username}
        </div>
        <div className="status-wrapper">
          <span className="status"> Status: </span> 
        <TextField
          className="profile-bio"
          value={this.state.input}
          onChange={this.nameInput}
          disabled={!this.state.editing}
          onKeyPress={e => (e.key === 'Enter' ? this.onSave() : null)}
        />
        </div>

        {this.state.editing
          ?
          <div className="profile-button">
            <Button className="profile-button" onClick={this.onSave}>Save</Button>
            <br/>
            <Button className="profile-button" onClick={this.onDelete}>Delete</Button>
          </div>
          :
          <div className="profile-button">
            <Button className="profile-button" onClick={this.onEdit}>Edit</Button>
              <br/>
            <Button className="profile-button" href="/">Logout</Button>
          </div>
        }
      </div>
    );
  }

}

export default Profile;
