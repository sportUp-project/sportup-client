import './ActivityCard.css'
import { useNavigate } from 'react-router-dom'

export default function ActivityCard(props) {
  const {activity} = props
  const navigate = useNavigate()
  function handleRouting(e) {
    navigate(`${activity._id}`)
  }
  return (
    <div className="activity-card" onClick={handleRouting}>
      <h3>{activity.name}</h3>
      <p>Description:{activity.description}</p>
      <p>Date:{activity.activityDate}</p>

      <p>Duration {activity.duration}</p>
      <p>Joined by: {activity.members.map(member => {
        return (
          member.name
        )
      })}</p>
      {activity.creadyBy?.name && <p>Created by: {activity.creadedBy.name}</p>}
    </div>
  )
}