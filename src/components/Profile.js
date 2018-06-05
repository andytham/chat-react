import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import './Profile.css';
import { Redirect } from 'react-router-dom';
class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      oldName: "",
      input: "",
      redirect: false,
    }
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.nameInput = this.nameInput.bind(this)
  }
  componentDidMount(){
    this.setState({
      input: this.props.username,
      oldName: this.props.username
    })
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(this.props.username != nextProps.username){

    }
  }

  onSave(){
    this.setState({
      editing: false,
    })
    self = this;
    axios.patch(`http://localhost:8080/users/name/${this.state.oldName}`, {
      username: this.state.input
    })
    .then(()=>{
      console.log('patch success');
      self.setState({
        oldName: this.state.input
      })
    })
    .catch(err=>{console.log(err);})
  }
  onDelete(){
    console.log('delte attempt');
    let self = this;
    axios.delete(`http://localhost:8080/users/name/${this.state.oldName}`)
    .then(() => {
      self.setState({
        redirect: true
      })
    })
    .catch(err=>{
      console.log(err);
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
      <div className="profile">
        <TextField
          className="profile-name"
          value={this.state.input}
          onChange={this.nameInput}
          disabled={!this.state.editing}
        />

        {this.state.editing ?
          <div>
            <Button onClick={this.onSave}>Save</Button>
            <br/>
            <Button onClick={this.onDelete}>Delete</Button>
          </div>
          :
          <Button onClick={this.onEdit}>Edit</Button> }

        <Button href="/">Logout</Button>
      </div>
    );
  }

}

export default Profile;
