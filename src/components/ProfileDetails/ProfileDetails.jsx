import "./ProfileDetails.css";
import {Link} from 'react-router-dom'

export default function ProfileDetails(props) {
  const { userInfo } = props;
  return (
    <div className="profile-holder">
      <h4>{userInfo.name}</h4>
      <img src={userInfo.image} alt="profile" />
      <h4>Description: {userInfo.description}</h4>
      <h4>Sports: {userInfo.sports}</h4>
      <h4>Joined Activites:{userInfo.joinedActivities}</h4>
      <h4>User created activities: {userInfo.userActivities}</h4>
    </div>
  );
}
