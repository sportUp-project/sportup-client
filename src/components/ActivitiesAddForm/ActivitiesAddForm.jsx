import './ActivitiesAddForm.css'
import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../context/auth.context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, {Marker} from '!react-map-gl'


export default function ActivitiesAddForm(props) {
  // map states
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 11,
  });

// eslint-disable-next-line
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [sport,setSport] = useState('')
  const [sportList,setSportList] = useState([])
  const [description,setDescription] = useState('')
  const [duration,setDuration] = useState(0)
  const [activityDate,setActivityDate] = useState('')
  // const [location,setLocation] = useState('')
  const storedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()

  function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
      setViewState({longitude:position.coords.longitude, latitude: position.coords.latitude}) 
      })
    } else {
      setViewState({longitude: 52.520008, latitude: 13.404954})
    }
  }

  useEffect(() => {
    getUserLocation()

    axios.get(`${process.env.REACT_APP_API_URL}/api/sports`)
    .then(response => setSportList(response.data.sort((a,b) => a.name.localeCompare(b.name))))
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
    <div className="activity-add-form">

    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}  maxLength="22"/>

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
