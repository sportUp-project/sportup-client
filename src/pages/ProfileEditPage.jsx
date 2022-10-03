import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";

export default function ProfileEditPage(props) {
  const [userInfo, setUserInfo] = useState(null);
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
  }, []);

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/api/sports`)
    .then(response => setSports(response.data))
    .catch(err => console.log(err))
  }, [])
  

  // show loading until page is ready
  if (!userInfo) {
    return <span>loading</span>;
  }

  return (
    <ProfileEditForm userInfo={userInfo} sports={sports}/>
  );
}
