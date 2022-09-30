export default function ActivityCard(props) {
  const {activity} = props
  return (
    <div className="activity-card">
      <h3>{activity.name}</h3>
      <p>Description:{activity.description}</p>
      <p>Date:{activity.activityDate}</p>
      <p>Location: {activity.location}</p>
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