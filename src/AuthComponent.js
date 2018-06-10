import Auth0Lock from 'auth0-lock';
import lock from './auth-config.js';

import React from 'react';
import { Redirect } from 'react-router-dom';
class AuthComponent extends React.Component {
	
	componentDidMount(){
		lock.show();
	}


	render(){
		lock.on("authenticated", function(authResult) {
			// Use the token in authResult to getUserInfo() and save it to localStorage
			lock.getUserInfo(authResult.accessToken, function(error, profile) {
				if (error) {
					// Handle error
					return;
				}
				console.log('authenticated as: ', profile.nickname)
				// document.getElementById('nick').textContent = profile.nickname;
		
				localStorage.setItem('accessToken', authResult.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));
			});
		});
		return(
			<div id="blank"></div>
		)
	}
}

export default AuthComponent;