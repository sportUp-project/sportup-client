import './SportsDropdown.css'
import { useNavigate } from 'react-router-dom'

export default function SportsDropdown(props) {
  const {sports} = props
  const navigate = useNavigate()
  function handleChange(e) {
    navigate(e.target.value)
  }
  function handleClick(e) {
    console.log('clicked:' + e.target.value)
  }

  return (
    <select name='dropdown' id='dropdown' onChange={handleChange}>
      <option disabled selected value> -- select a sport -- </option>
      {sports.map(sport => {
        return (
          <option value={`sport/${sport._id}`}>{sport.name} : ({sports.activities?.length})</option>
        )
      })}
    </select>
  )
}