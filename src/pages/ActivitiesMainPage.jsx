import {useState, useEffect, useMemo} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import ActivitiesList from '../components/ActivitiesList/ActivitiesList'
import SportsList from '../components/SportsList/SportsList'
import SportsDropdown from '../components/SportsDropdown/SportsDropdown'
import './ActivitiesMainPage.css'
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import Map, {Marker, Popup} from '!react-map-gl'

export default function ActivitiesMainPage(props) {
  // map & marker states
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 15,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  // end of marker and map states
  const [activities, setActivities] = useState([])
  const [sports,setSports] = useState([])
  function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
      setViewState({longitude:position.coords.longitude, latitude: position.coords.latitude, zoom: 9}) 
      })
    } else {
      setViewState({longitude: 52.520008, latitude: 13.404954})
    }
  }
  
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
  useEffect(() => {

    getUserLocation();

    axios.get(`${process.env.REACT_APP_API_URL}/api/activities`)
    .then(response => {
      // eslint-disable-next-line
      const shuffledArr = shuffleArray(response.data)

      setActivities(response.data)
    })
    .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sports`)
    .then(response => {  
      const sportsList = response.data
          sportsList.sort((a,b)=> {
            return b.activities.length - a.activities.length
          })
      setSports(sportsList)
    })
    .catch(err => console.log(err))
  }, [])

  const markersForActs = useMemo(() => 
  activities.map(activ => {
    return (
    <Marker 
    key={activ._id}
    color = '#3E7B3E'
    id = {activ._id}
    longitude={activ.location.long}
    latitude={activ.location.lat}
    onClick= {(evt) => {
      evt.originalEvent.stopPropagation();
      setPopupInfo(activ);
    }}
  >
  </Marker>
  )})
  , [activities])
  
  if (activities.length === 0  || sports.length === 0) {
    return <span>Loading...</span>
  }

  const sportsCopy = [...sports]
  const sportsShortList = sportsCopy.slice(0,5)

  return (
    <div className="activities-main">
      <div className='choose-sport'>
        <h3>Choose from our most popular sports:</h3>
        <SportsList sports={sportsShortList} showDetails={false}/>
      
        <h3>Or select from all sports: </h3>
        <SportsDropdown sports={sports} />
      </div>

      <Map
      className="activities-map"
      {...viewState}
      style={{ height: 350, boxShadow: 'rgba(0, 0, 0, 0.452) 0px 5px 15px', marginBottom:'30px' }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/light-v10"

      >
      {markersForActs}
      {popupInfo && (
        <Popup
        anchor = 'top'
        longitude={Number(popupInfo.location.long)}
        latitude={Number(popupInfo.location.lat)}
        onClose={()=>setPopupInfo(null)}
        >
          <div className="popup">
            <span>{popupInfo.name}</span>
            <span>{popupInfo.sport.name}</span>
            <span>Created by: {popupInfo.createdBy.name}</span>
              <Link className='popup-link' to={`/activities/${popupInfo._id}`}>DETAILS</Link>
          </div>
        </Popup>
      )}
      </Map>
    
      <h3>Latest added activities</h3>
      <ActivitiesList activities={activities}  />
    </div>
  )
}