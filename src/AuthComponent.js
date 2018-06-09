import Auth0Lock from 'auth0-lock';
var lock = new Auth0Lock('v0MVweBrzRBmP74attU15PyCFM3HJQvY', 'andytham.auth0.com', {
  container: 'auth',
  auth: {
    redirectUrl: 'http://localhost:3000/',    // If not specified, defaults to the current page 
    configurationBaseUrl: 'https://cdn.auth0.com',
    responseType: 'token',
    params: {
      scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
    }
  }
});

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