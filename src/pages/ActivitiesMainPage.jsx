import {useState, useEffect} from 'react'
import axios from 'axios'
import ActivitiesList from '../components/ActivitiesList/ActivitiesList'

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

  console.log(sports)
  console.log(activities)
  if (activities.length === 0  || sports.length === 0) {
    return <span>Loading...</span>
  }

  return (
    <ActivitiesList activities={activities} />
  )
}