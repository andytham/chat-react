import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
class Profile extends Component {
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
  }

  render() {
    return (
      <div>
        <div>
          {this.props.username}
        </div>
        <Button>Logout</Button>
      </div>
    );
  }

}

export default Profile;
