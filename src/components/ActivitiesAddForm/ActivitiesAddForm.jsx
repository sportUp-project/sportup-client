import './ActivitiesAddForm.css'
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../context/auth.context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ActivitiesAddForm(props) {
  const {user} = useContext(AuthContext)

  const [name,setName] = useState('')
  const [sport,setSport] = useState('')
  const [sportList,setSportList] = useState([])
  const [description,setDescription] = useState('')
  const [duration,setDuration] = useState(0)
  const [activityDate,setActivityDate] = useState('')
  const [location,setLocation] = useState('')
  const storedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sports`)
    .then(response => setSportList(response.data))
    .catch(err => console.log(err))
  }, [])
  


  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name,
      description,
      duration,
      activityDate,
      location,
      sport
    }
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/activities`,
      payload,
      {headers: {Authorization: `Bearer ${storedToken}`}}
      )
      .then(response => {
        const activityId = response.data._id
        navigate(`/activities/${activityId}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />

      <label htmlFor="sport">Sport</label>
      <select name="sport" id="sport" value={sport} onChange={e => setSport(e.target.value)}>
        {sportList.map(sport => {
          return (
            <option key={sport._id} value={sport._id}>{sport.name}</option>
          )
        })}
      </select>

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} />

      <label htmlFor="duration">Duration</label>
      <input type="number" name="duration" id="duration" value={duration} onChange={e => setDuration(e.target.value)}/>

      <label htmlFor="date">Date and Hour</label>
      <input type="datetime-local" name="date" id="date" value={activityDate} onChange={e=>setActivityDate(e.target.value)}/>

      <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" value={location} onChange={e=>setLocation(e.target.value)}/>


      <button type='submit'>Submit</button>
    </form>
  )
}

// name: { type: String, required: true }, 
//     createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
//     sport: { type: Schema.Types.ObjectId, ref: 'Sport' },
//     description: String,
//     duration: String,
//     activityDate: String,
//     members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//     location: String,
//     pictures:  [{ type: String}]