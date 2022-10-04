import {useState, useEffect} from 'react'
import axios from 'axios'
import ActivitiesList from '../components/ActivitiesList/ActivitiesList'
import SportsList from '../components/SportsList/SportsList'
import SportsDropdown from '../components/SportsDropdown/SportsDropdown'
import './ActivitiesMainPage.css'

export default function ActivitiesMainPage(props) {
  const [activities, setActivities] = useState([])
  const [sports,setSports] = useState([])
  
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/activities`)
    .then(response => {
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


  if (activities.length === 0  || sports.length === 0) {
    return <span>Loading...</span>
  }

  const sportsCopy = [...sports]
  const sportsShortList = sportsCopy.slice(0,5)


  console.log(activities)
  return (
    <div className="activities-main">
      <div className='choose-sport'>
        <h3>Choose from our most popular sports:</h3>
        <SportsList sports={sportsShortList} />
      
        <h3>Or select from all sports: </h3>
        <SportsDropdown sports={sports} />
      </div>
      
      <h3>Latest added activities</h3>
      <hr/>
      <ActivitiesList activities={activities}  />
    </div>
  )
}