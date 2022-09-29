import { useState, useEffect, useContext } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ProfileDetails from '../components/ProfileDetails/ProfileDetails'
import ProfileEditPage from "./ProfileEditPage";
import axios from "axios";

export default function ProfilePage(props) {
  const { user } = useContext(AuthContext);
  const { id: pageUserId } = useParams();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // get the token from localStorage
    const storedToken = localStorage.getItem("authToken");
    // and send it as part of the request to see the profile page
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile/${pageUserId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log({userInfo})
  console.log({user})
  if (userInfo === null) {
    return <span>Loading</span>;
  }

  return (
    <div className="profile-page">
      <ProfileDetails userInfo={userInfo} />
      {user._id === userInfo._id && <Link to={`/profile/${user._id}/edit`}>Edit profile </Link>}
      {user._id === userInfo._id && <Link to={`/activities/add`}>Add an activity</Link>}
    </div>

  )
}