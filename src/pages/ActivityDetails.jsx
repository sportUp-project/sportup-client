import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

export default function ActivityDetails(props) {
  const {id} = useParams()
  const [activity, setActivity] = useState(null)
  const storedToken = localStorage.getItem('authToken')

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/api/activities/${id}`,
      {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(response => {
        setActivity(response.data)
      })
      .catch(err => console.log(err))
  }, [])
  
  if (activity === null) {
    return <span>Loading...</span>
  }
  
  return (
    <div className="activity-details">
      <h4>{activity.name}</h4>
      <h4>{activity.createdBy.name}</h4>
      <h4>{activity.sport.name}</h4>
    </div>
  )
}