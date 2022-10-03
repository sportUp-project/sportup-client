import "./ProfileDetails.css";
import {Link} from 'react-router-dom'

export default function ProfileDetails(props) {
  const { userInfo } = props;
  console.log(userInfo)
  return (
    <div className="profile-holder">
      <h4>{userInfo.name}</h4>
      <img src={userInfo.image} alt="profile" />
      <h4>Description: {userInfo.description}</h4>
      <h4>Sports: {userInfo.sports}</h4>
      <h4>Joined Activites:{userInfo.joinedActivities.length}</h4>
      {userInfo.joinedActivities.map(act => {
        return (
          <Link to={`/activities/${act._id}`}>{act.name}</Link>
        )
      })} 
      <h4>Created Activities:{userInfo.userActivities}</h4>
      {userInfo.userActivities.map(act => {
        return (
          <p key={act._id}>{act.name}</p>
        )
      })}
    </div>
  );
}
