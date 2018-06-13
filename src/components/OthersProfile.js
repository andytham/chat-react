import React, { Component } from 'react';
import axios from 'axios';
import url from '../../server-var';
import './Profile.css';

class OthersProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			bio: ""
		  };
	}
  componentDidMount(){
		console.log('receiving props');
		let self = this;
		console.log(this.props);
		if(this.props){
			axios.get(`${url.PROFILES_API}/user-profiles/name/${this.props.username}`)
			.then(data => {
				self.setState({
					username: data.data.nickname,
					bio: data.data.bio
				})
			})
			.catch(err => {
				console.log(err);
			})
		}
	}

	componentWillReceiveProps(nextProps){

	}

	render() {
		return (
			<div className="other-profile">
				<div>
					<div>
						{this.state.username}'s profile
					</div>	
					<div className="status">	
						{this.state.bio ? this.state.bio : "no status"}
					</div>
				</div>
			</div>
		);
	}
}

export default OthersProfile;