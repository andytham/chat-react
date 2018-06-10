import Auth0Lock from 'auth0-lock';
import lock from './auth-config.js';

import React from 'react';

class AuthComponent extends React.Component {
	
	componentDidMount(){
    lock.show();
	}
	render(){
		return(
			<div id="auth"></div>
		)
	}
}

export default AuthComponent;