import "./ActivityCard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import UserCard from '../UserCard/UserCard'

export default function ActivityCard(props) {
  const { activity } = props;
  const navigate = useNavigate();

  let limitedMembers = []
  let count = 0
  if( activity.members > 8 ){
    limitedMembers = activity.members.split(8)
    count = activity.members.slice(8).length
  } else {
    limitedMembers = activity.members
  }

  function renderDate() {
    return moment(activity.activityDate).format("MMM Do YYYY, hh:mm");
  }
  const dateFormatted = activity ? renderDate() : null;
  function renderDuration() {
    return moment.duration(activity.duration, 'hours').humanize()
  }
  const durationFormatted = activity? renderDuration() : null;

  function handleRouting(e) {
    navigate(`${activity._id}`);
  }
  return (
    <div className="activity-card" onClick={handleRouting}>
      <div className="user-icon">
        <UserCard user={activity.createdBy} />
      </div>
      <img className="activity-img" src={activity.sport.imageUrl} alt={activity.sport.name} />
      {/* <img classNAme="user-icon" src={activity.createdBy.image} alt={activity.createdBy.name} /> */}
      <h3>{activity.name}</h3>  
      <hr/>
      <p className="decription">{activity.description}</p>      
      <p className='full'><span className="bold-text">Date: </span>{dateFormatted}</p>
      <p className='full'>{durationFormatted}</p>
      {activity.members.length > 0 && 
        <p className='full'>Joined by: </p>}
        <div className='icon-container'>
        { limitedMembers.map((member) => {
          return <UserCard user={member} />;
        })}
        {count > 0 && <p>'+'+{count}</p>}
        </div>

    </div>
  );
}
