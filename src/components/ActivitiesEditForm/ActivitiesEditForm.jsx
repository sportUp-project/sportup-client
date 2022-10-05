import './ActivitiesEditForm.css'
import { useNavigate } from 'react-router-dom'
import Map, {Marker} from 'react-map-gl'
import {useState, useEffect, useContext,} from 'react'
import { AuthContext } from '../../context/auth.context'
import axios from 'axios'
import UserCard from '../UserCard/UserCard'

export default function ActivitiesEditForm(props) {

  const {activity} = props

    // map states
    const [viewState, setViewState] = useState({
      longitude: activity.location.long,
      latitude: activity.location.lat,
      zoom: 11,
    });

  const {user} = useContext(AuthContext)

  const [name,setName] = useState(activity.name)
  const [sport,setSport] = useState(activity.sport)
  const [description,setDescription] = useState(activity.description)
  const [duration,setDuration] = useState(activity.duration)
  const [activityDate,setActivityDate] = useState(activity.activityDate)
  const [members, setMembers] = useState(activity.members)
  const storedToken = localStorage.getItem('authToken')
  const [sportList,setSportList] = useState([])
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
      location: {long: viewState.longitude, lat: viewState.latitude},
      sport
    }
    axios.put(
      `${process.env.REACT_APP_API_URL}/api/activities/${activity._id}`,
      payload,
      {headers: {Authorization: `Bearer ${storedToken}`}}
      )
      .then(response => {
        navigate(`/activities/${activity._id}`)
      })
      .catch(err => console.log(err))
  }

  function handleMemberRemove(e) {
    e.preventDefault();
    setMembers(members.filter(member => member._id !== e.target.getAttribute('id')))

  }

  return (
    <div className="activity-add-form">

    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} maxlength="22"/>

      <label htmlFor="sport">Sport</label>
      <select name="sport" id="sport" onChange={e => setSport(e.target.value)} defaultValue="-- select a sport --">
        <option disabled> -- select a sport -- </option>
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

      {/* <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" value={location} onChange={e=>setLocation(e.target.value)}/> */}
      {members && <label htmlFor="members">Joined by:</label>}
      <div className="members-holder">
        {members.map(member => {
            {/* <span id={member._id} key={member._id}>{member.name}</span> */}
          return (
            <UserCard user={member} />
          )
        })}
      </div>

      <button className='button' type='submit'>Submit</button>
    </form>
    
    <Map
      {...viewState}
      style={{ height: 350, width: 350 }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"

    >
      <Marker
        longitude={viewState.longitude}
        latitude={viewState.latitude}
      ></Marker>

    </Map>
    </div>
    
  )
  

}