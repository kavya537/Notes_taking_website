import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [formIsVisible,setFormIsVisible]=useState(false);
  const [loggedIn,setIsLoggedIn]=useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const addNote = () => {
    if (title.trim() === '' || description.trim() === '') return;

    const newNote = {
      id: Date.now(),
      title,
      description,
      timestamp: new Date().getTime(),
    };

    setNotes([...notes, newNote]);
    setTitle('');
    setDescription('');
    setFormIsVisible(false);

  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
    const sortedNotes = [...notes].sort((a, b) =>
      sortAscending
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp
    );
    setNotes(sortedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNoteFormVisible=()=>{
    setFormIsVisible(true);
  }
  const cancelNote=()=>{
    setFormIsVisible(false);
  }

  const validateEmail = (email) => {
    // Basic email validation with regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const loginHandler=()=>{
    let emailValue = email.trim();
    let passwordValue = password.trim();
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(emailValue)) {
      emailError = 'Invalid email format';
    }

    if (!validatePassword(passwordValue)) {
      passwordError = 'Invalid password format';
    }

    if (emailError === '' && passwordError === '') {
      // Perform login action here
      setIsLoggedIn(true);
    }
    setEmailError(emailError);
    setPasswordError(passwordError);
  }
  const logoutHandler = () => {
    // Perform logout action by setting loggedIn state to false
    setIsLoggedIn(false);
  };

  const element=<div className="app">
  <h1>Notes App</h1>
  <button className='btn btn-primary' onClick={logoutHandler}>Log Out</button>
  <button onClick={handleNoteFormVisible}>Add Note</button>
  {formIsVisible &&
    <>
    <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
  <button className='btn btn-primary' onClick={addNote}>Submit</button>
  <button className='btn btn-primary' onClick={cancelNote}>Cancel</button>
  </>
  }

  <input
    type="text"
    placeholder="Search Notes"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button onClick={toggleSortOrder}>
    Sort {sortAscending ? 'Ascending' : 'Descending'}
  </button>

  <div className="note-list">
    {filteredNotes.map((note) => (
      <div className="note" key={note.id}>
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <p>{new Date(note.timestamp).toLocaleString()}</p>
        <button onClick={() => deleteNote(note.id)}>Delete</button>
      </div>
    ))}
  </div>
</div>
;
const loginForm=(<div className='centered-container'><h1 className='login title'>Notes App</h1><div><input type='email' required placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><p className='error'>{emailError}</p></div>
<div><input type='password' placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)}></input><p className="error">{passwordError}</p></div>
<button className='btn btn-primary' onClick={loginHandler}>Login</button></div>);
  return (
    <div className='app-container'>
    {loggedIn && element}
    {!loggedIn && loginForm}
    </div>
    );
}

export default App;
