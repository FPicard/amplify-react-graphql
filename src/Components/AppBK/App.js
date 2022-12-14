import React, { useState, useEffect } from 'react';
import './App.css';
import Amplify from 'aws-amplify';

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
  const notesFromAPI = apiData.data.listNotes.items;
  await Promise.all(notesFromAPI.map(async note => {
    if (note.image) {
      const image = await Storage.get(note.image);
      note.image = image;
    }
    return note;
  }))
  setNotes(apiData.data.listNotes.items);
}

async function onChange(e) {
  if (!e.target.files[0]) return
  const file = e.target.files[0];
  setFormData({ ...formData, image: file.name });
  await Storage.put(file.name, file);
  fetchNotes();
}

async function createNote() {
  if (!formData.name || !formData.description) return;
  await API.graphql({ query: createNoteMutation, variables: { input: formData } });
  if (formData.image) {
    const image = await Storage.get(formData.image);
    formData.image = image;
  }
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



    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>



      <header className="App-header">

        <h1>Hello Marie Th??r??se</h1>





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
	  <input
	  type="file"
	  onChange={onChange}
		/>
      <Button variant="contained" color="primary" onClick={createNote}>Create Notes</Button>
      <div style={{marginBottom: 30}}>
        {
           notes.map(note => (
			<div key={note.id || note.name}>
			  <h2>{note.name}</h2>
			  <p>{note.description}</p>
			  {
				  				

				note.image && <img src={note.image} style={{width: 400}} alt={note.image} />
			  }
			  			  <Button variant="contained" color="secondary" onClick={() => deleteNote(note)}>Delete note</Button>

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