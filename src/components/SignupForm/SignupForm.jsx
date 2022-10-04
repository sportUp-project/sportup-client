import './SignupForm.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function SignupForm(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    const requestToServer = {name,email, password,  }

    axios.post(process.env.REACT_APP_API_URL + '/auth/signup', requestToServer)
    .then(response => {
      navigate('/login')
    })
    .catch(err => {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription)
    })
  }

  return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='email'>Email</label>
        <input
          type="text"
          name="name"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Sign up</button>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
      </form>

  );
}
