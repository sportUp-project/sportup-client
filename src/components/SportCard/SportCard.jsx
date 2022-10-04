import './SportCard.css'
import { useNavigate } from 'react-router-dom'

export default function SportCard(props) {
  const {sport} = props
  const navigate = useNavigate()
  function handleRouting(e) {
    navigate(`sport/${sport._id}`)
  }

  return (
    <div className="sport-card" onClick={handleRouting}>
      <div className="image-holder">
        <img src={sport.iconUrl} alt={sport.name} />

      </div>
      <span>{sport.name}</span>
      <span>{sport.activities.length}</span>
    </div>
  )
}