import "./ActivityCard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import UserCard from '../UserCard/UserCard'
import { v4 as uuidv4 } from 'uuid'

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

  function renderjoinedBy() {
    if (limitedMembers.length === 1 && limitedMembers[0]._id === activity.createdBy._id ) {
      return
    } else {
      return (
        <div className="joinedMmbrs">
                  <p className='full'>Joined by: </p>
        <div className='icon-container'>
        { limitedMembers.map((member) => {
          return <UserCard key={uuidv4()} user={member} />;
        })}
        {count > 0 && <p>'+'+{count}</p>}
        </div>

        </div>
      )
    }
  }

  function renderDate() {
    return moment(activity.activityDate).format("d.M.yyyy, hh:mm A");
  }
  const dateFormatted = activity ? renderDate() : null;
  function renderDuration() {
    return moment.duration(activity.duration, 'hours').humanize()
  }
  const durationFormatted = activity? renderDuration() : null;

  function handleRouting(e) {
    navigate(`/activities/${activity._id}`);
  }
  return (
    <div className="activity-card" onClick={handleRouting}>
      <div className="user-icon">
        <UserCard key={uuidv4()} user={activity.createdBy} />
      </div>
      <img className="activity-img" src={activity.sport.imageUrl} alt={activity.sport.name} />
      {/* <img classNAme="user-icon" src={activity.createdBy.image} alt={activity.createdBy.name} /> */}
      <h3>{activity.name}</h3>  
      <hr/>
      <p className="decription">{activity.description}</p>      
      <p className='full'><span className="bold-text">Date: </span>{dateFormatted}</p>
      <p className='full'>{durationFormatted}</p>
      {activity.members.length > 0 && 
        renderjoinedBy()}

    </div>
  );
}
