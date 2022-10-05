import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ActivitiesEditForm from '../components/ActivitiesEditForm/ActivitiesEditForm'


export default function ActivitiesEdit(props) {
  const {id} = useParams()
  const [activity, setActivity] = useState(null);
  const storedToken = localStorage.getItem('authToken')


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/activities/${id}/edit`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(response => setActivity(response.data))
    .catch(err => console.log(err))
    // eslint-disable-next-line
  }, [])
  
  if (activity === null) {
    return <span>loading</span>
  }

  return (
    <ActivitiesEditForm activity={activity} />
  )
}