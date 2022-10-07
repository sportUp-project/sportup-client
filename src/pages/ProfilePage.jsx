import { useState, useEffect, useContext } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ProfileDetails from '../components/ProfileDetails/ProfileDetails'
import axios from "axios";
import LoadingSpiral from "../components/LoadingSpiral/LoadingSpiral";

export default function ProfilePage(props) {
  const { user } = useContext(AuthContext);
  const { id: pageUserId } = useParams();
  const navigate = useNavigate()

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
        const user = response.data.user
        setUserInfo(user);
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      });
      // eslint-disable-next-line
  }, [pageUserId]);

  if (userInfo === null) {
    return <span><LoadingSpiral/></span>;
  }

  return (
    <div className="profile-page">
      <ProfileDetails userInfo={userInfo} user={user} setUserInfo={setUserInfo}/>

    </div>

  )
}
