import ActivityCard from "../ActivityCard/ActivityCard";
import './ActivitiesList.css'


export default function ActivitiesList(props) {
  const {activities} = props
  return (
    <div className="activities-list">
    {activities.map(activity => {
      return <ActivityCard key={activity._id} activity={activity} />
    })}
    </div>
  )
}