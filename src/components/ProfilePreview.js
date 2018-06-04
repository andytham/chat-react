import React, { Component } from 'react';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
class ProfilePreview extends Component {
  constructor(props){
    super(props);

  }
  render() {
    // console.log(props);
    const MyLink = props => <Link to="/profile" {...props} />
    return (
      <div>
        <div>
          Hi, {this.props.username}!
        </div>
        <div>
          {/* <Link to={
          {
            pathname: '/profile',
            state: {
              username: this.props.username
            }
          }}>
          profile
        </Link>
          <Link to="/"> logout </Link> */}
          <Button
            component={MyLink}
            to="/profile"
          >
            profile
          </Button>
          <Button href="/">
            logout
          </Button>
        </div>

      </div>
    );
  }

}

export default ProfilePreview;
