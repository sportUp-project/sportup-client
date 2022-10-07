import './UserCard.css'
import { useState } from 'react';


export default function UserCard(props) {
  const {user} = props;
  const [ showName, setShowName ] = useState(false)



  return (
    <div className="user-info">
    <div className="user-card" style={{backgroundImage : `url(${user.image})`}} onMouseEnter={()=>setShowName(true)} onMouseLeave={()=>setShowName(false)}>
       </div>
    {showName && <p className="user-name" >{user.name}</p>}
    </div>
  )
}