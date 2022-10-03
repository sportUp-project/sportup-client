import "./ProfileEditForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ProfileEditForm(props) {
  
  const { userInfo } = props;
  const {sports} =  props

  const [user, setUser] = useState(userInfo);

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [description, setDescription] = useState(user.description);
  const [password, setPassword] = useState("");
  const [userSports,setUserSports] = useState(user.sports)
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { name, image, description };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/profile/${userInfo._id}`,
        payload,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/profile/${userInfo._id}`);
      })
      .catch((err) => console.log(err));
  }

  const uploadImage = (file) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/profile/upload`, file)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  function handleFileUpload(e) {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setImage(response.fileUrl);
      })
      .catch((err) => console.log(err));
  }

  function handleSportClick(e) {
    e.preventDefault()
    const targetId = e.target.id
    console.log(`clicked ${targetId}`)
    
    if (userSports.includes(targetId)) {
      const userSportsCopy = [...userSports]
      setUserSports(userSportsCopy.filter(sport => sport !== targetId))
    } else{
      const userSportsCopy = [...userSports]
      console.log(userSportsCopy)
      setUserSports([...userSportsCopy, targetId])
    }

  }

  if (!user) {
    return <p>loading</p>;
  }

  return (
    <div className="form-holder">

    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="image">Image</label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => handleFileUpload(e)}
      />

      {/* <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/> */}



      <button type="submit">Save changes</button>
    </form>

          <div className="sport-holder">
      {sports.map(sport => {
        return (
            <span key={sport._id} id={sport._id} onClick={handleSportClick} >{sport.name}</span>
        )
      })}
          </div>
    </div>
  );
}
