import React from 'react';
import { Redirect } from 'react-router-dom';
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      loginSuccess: false,
		  };
	}
	async componentDidMount(){
		console.log('bout to set state', this.props);
		await this.setState({
			loginSuccess: this.props.loginSuccess
		})
		console.log('after set state');
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
	}

	render() {
		if(this.state.loginSuccess){
      return <Redirect to='/chat'/>;
    } else {
			return <Redirect to='/login'/>;
		}

	}
}

export default Home;