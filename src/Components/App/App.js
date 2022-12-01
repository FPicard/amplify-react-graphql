import { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsConfig from './../../aws-exports';
import './App.css';
import React from 'react';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react-v1';
import { listNotes } from './../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './../../graphql/mutations';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './../../aws-exports';
import { API, Storage } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import Contact from "../../Pages/Contact";
import imagedd from '../../Images/Interieur.png';
import imageee from '../../Images/Gardienne.png';
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(',');

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);

function App() {
const [user, setUser] = React.useState();
  const [authState, setAuthState] = React.useState();

  useEffect(() => {

    getUser().then(userData => setUser(userData));
	   return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  } 

  return (
	    <div className="App">

	



    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>



      <header className="App-header">
	  <div> 
      <img class="fit-picture2" src={imagedd} />
	  </div> 
	  
	  
	  	  {user ? (

	  <div>
      TEST Utilisateur logguer {Auth.user.attributes.email}

	  </div> 


		  ) : (
		  <div> </div>
		  )}
	  
	  
	  <div>
      <img class="fit-picture2" src={imageee} />
	  </div> 

	  <div>
      <img class="fit-picture2" src={imagedd} />
	  </div> 

	  <div>
      <img class="fit-picture2" src={imageee} />

	  </div> 
	  


	  
	  </header>
	  
	  
    </div>
  );
}

export default App;