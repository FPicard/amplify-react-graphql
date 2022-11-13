import React, { useState, useEffect } from 'react';
import './App.css';
import Amplify from 'aws-amplify';

import { API } from 'aws-amplify';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react-v1';
import logo from './Logo.jpg';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [user, setUser] = React.useState();
  const [authState, setAuthState] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);
  
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
	  alert(id);
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello Marie Thérèse</h1>





	<div>Utilisateur logguer {user.username}</div>
      <AmplifySignOut />
	  
	  


	  
	  </header>
	  
	   <h1>Test Database</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
			     <p>{note.username}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div>
	  
	  
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
}

export default withAuthenticator(App);