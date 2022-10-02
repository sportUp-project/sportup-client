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
          <h4 key={act._id}>{act.name}</h4>
        )
      })} 
      <h4>Created Activities:{userInfo.userActivities}</h4>
      {userInfo.userActivities.map(act => {
        return (
          <p key={act._id}>{act.name}</p>
        )
      })}
      {/* <h4>User created activities: {userInfo.userActivities[0]}</h4> */}
    </div>
  );
}
