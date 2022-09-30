import './SportsDropdown.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SportsDropdown(props) {
  const {sports} = props
  const [chosenSport,setChosenSport] = useState('')

  const navigate = useNavigate()
  function handleChange(e) {
    e.preventDefault();
    navigate(chosenSport)
  }

  // later fix issue with already preselected sport not working
  return (
    <form onSubmit={handleChange}>
      <select name='dropdown' id='dropdown' onChange={e => setChosenSport(e.target.value)}>
        <option disabled selected value> -- select a sport -- </option>
        {sports.map(sport => {
          return (
            <option value={`sport/${sport._id}`}>{sport.name} : ({sports.activities?.length})</option>
          )
        })}
      </select>
      <button type='submit'>Go to sport</button>
    </form> 
  )
}