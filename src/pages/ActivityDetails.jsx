import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Map, Marker} from 'react-map-gl'

export default function ActivityDetails(props) {
  const {id} = useParams()
  const [activity, setActivity] = useState(null)
  const storedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()


    // map states
    
    
    useEffect(() => {
      axios.get(
        `${process.env.REACT_APP_API_URL}/api/activities/${id}`,
      {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setActivity(response.data)
      })
      .catch(err => {
        // navigate('/login')
        console.log(err)
      })
    }, [])
  
  function renderMap() {
    return (

    
    <div className="map-holder">
        <Map
        initialViewState={{
        longitude: activity.location.long,
        latitude: activity.location.lat,
        zoom: 12
      }}
      style={{ height: 300, width: 300 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"

    >
      <Marker
        longitude={activity.location.long}
        latitude={activity.location.lat}
      ></Marker>

    </Map>
      </div>
      )
  }


  if (activity === null) {
    return <span>Loading...</span>
  }
  console.log(activity)
  return (
    <div className="activity-details">
      <h4>{activity.name}</h4>
      <p>{activity.createdBy.name}</p>
      <p><Link to={`/activities/sport/${activity.sport._id}`}>{activity.sport?.name}</Link></p>
      <p>{activity.description}</p>
      <p>Duration: {activity.duration} hours</p>
      <p>Members joining:</p>
      {activity.members.map(member => {
        return <p>{member.name}</p>
      })}


      {/* conditionally render map to avoid errors */}
      {activity !== null && renderMap()}

    </div>
  )
}