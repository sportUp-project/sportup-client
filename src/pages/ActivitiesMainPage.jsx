import {useState, useEffect} from 'react'
import axios from 'axios'
import ActivitiesList from '../components/ActivitiesList/ActivitiesList'
import SportsList from '../components/SportsList/SportsList'

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
      setSports(response.data)
    })
    .catch(err => console.log(err))
  }, [])

  if (activities.length === 0  || sports.length === 0) {
    return <span>Loading...</span>
  }

  return (
    <div className="activities-main">
      
      <SportsList sports={sports} />
      <ActivitiesList activities={activities} />
    </div>
  )
}