import React, { Component } from 'react';
import axios from 'axios';
import url from '../../server-var';
import './Profile.css';

class OthersProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			status: ""
		  };
	}
  componentDidMount(){
		console.log('receiving props');
		let self = this;
		console.log(this.props);
		if(this.props){
			console.log("running get ", `${url.PROFILES_API}/name/${this.props.username}`);
			axios.get(`${url.PROFILES_API}/name/${this.props.username}`)
			.then(data => {
				console.log("setting stuff from", data.data);
				self.setState({
					username: data.data.nickname,
					status: data.data.status
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
						{this.state.status ? this.state.status : "no status"}
					</div>
				</div>
			</div>
		);
	}
}

export default OthersProfile;