import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";
import LoadingSpiral from "../components/LoadingSpiral/LoadingSpiral";

export default function ProfileEditPage(props) {
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [sports,setSports] = useState([])

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserInfo(response.data.user);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/sports`)
    .then(response => setSports(response.data))
    .catch(err => console.log(err))
    // eslint-disable-next-line
  }, [])
  

  // show loading until page is ready
  if (!userInfo) {
    return <span><LoadingSpiral/></span>;
  }

  return (
    <ProfileEditForm userInfo={userInfo} sports={sports}/>
  );
}
