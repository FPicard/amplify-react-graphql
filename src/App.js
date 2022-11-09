import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import logo from './logo.svg';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react-v1';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

 
const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello Marie Thérèse</h1>
      
	<div>Utilisateur logguer {user.username}</div>
      <AmplifySignOut />
	  </header>
    </div>
  ) : 
  
  (
        <header className="App-header">

    <AmplifyAuthenticator>
  <AmplifySignIn
    headerText="Essai Connection Francois v1_17"
    slot="sign-in"
	formFields={[
		  { type: 'username' },
          {
            type: 'password',
            label: 'Test Encyptage Password',
            placeholder: 'password',
            inputProps: { required: true, autocomplete: 'password' },
          },
        ]}
  ></AmplifySignIn>
</AmplifyAuthenticator>
	  </header>

  );
};




export default AuthStateApp;