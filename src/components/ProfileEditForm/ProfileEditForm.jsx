import "./ProfileEditForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileEditForm(props) {
  const { userInfo } = props;
  const { sports } = props;

  const [user] = useState(userInfo);

  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [description, setDescription] = useState(user.description);
  const [userSports, setUserSports] = useState(
    user.sports.map((sport) => sport._id)
  );
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { name, image, description, sports: userSports };
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
    e.preventDefault();
    const targetId = e.currentTarget.id;

    if (userSports.includes(targetId)) {
      const userSportsCopy = [...userSports];
      setUserSports(userSportsCopy.filter((sport) => sport !== targetId));
    } else {
      const userSportsCopy = [...userSports];
      setUserSports([...userSportsCopy, targetId]);
    }
  }

  if (!user) {
    return <p>loading</p>;
  }

  return (
    <div className="edit-form-holder">
      <form onSubmit={handleSubmit}>
      <img className="edit-img" src={user.image} alt="" />
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

        <label className="button" htmlFor="image">Upload an image
        <input
         style={{display:"none"}}
          type="file"
          name="image"
          id="image"
          onChange={(e) => handleFileUpload(e)}
        />
        </label>
        
        <button className="button" type="submit">Save changes</button>
      </form>
      <div className="edit-sport-holder">
        {sports.map((sport) => {
          if (userSports.includes(sport._id)) {

            return (
              <div id={sport._id} className="sport-card clicked" onClick={handleSportClick}>
                <div className="image-holder">
                  <img src={sport.iconUrl} alt={sport.name} />
                </div>
                <span>{sport.name}</span>
              </div>
            );
          }
          return (
            <div id={sport._id} className="sport-card" onClick={handleSportClick}>
                <div className="image-holder">
                  <img src={sport.iconUrl} alt={sport.name} />
                </div>
                <span>{sport.name}</span>
              </div>
          );
        })}
      </div>
    </div>
  );
}
