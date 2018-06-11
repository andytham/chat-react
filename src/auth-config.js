import Auth0Lock from 'auth0-lock';
var lock = new Auth0Lock('v0MVweBrzRBmP74attU15PyCFM3HJQvY', 'andytham.auth0.com', {
  container: 'auth',
  auth: {
    // redirectUrl: 'http://ec2-18-188-70-45.us-east-2.compute.amazonaws.com:3000/chat',    // If not specified, defaults to the current page 
    redirectUrl: 'http://localhost:3000/chat',
    configurationBaseUrl: 'https://cdn.auth0.com',
    responseType: 'token',
    params: {
      scope: 'openid profile email'                // Learn about scopes: https://auth0.com/docs/scopes
      // scope: 'openid email' //profile (consent) needed for localhost

    },
    sso: false //stops single sign on
  }
});
// Listening for the authenticated event
// lock.on("authenticated", function(authResult) {
//   // Use the token in authResult to getUserInfo() and save it to localStorage
//   lock.getUserInfo(authResult.accessToken, function(error, profile) {
//     if (error) {
//       // Handle error
//       return;
//     }

//     // document.getElementById('nick').textContent = profile.nickname;

//     localStorage.setItem('accessToken', authResult.accessToken);
//     localStorage.setItem('profile', JSON.stringify(profile));
//   });
// });

export default lock;