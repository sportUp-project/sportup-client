
import { useState } from 'react';
//import ActivityCard from '../ActivityCard/ActivityCard';
import ActivitiesList from '../ActivitiesList/ActivitiesList';
import './Search.css';

function Search(props) {
    const [ search, setSearch ] = useState('')
    const { searchedData } = props;

   const handleInput = e => {
      setSearch(e.target.value);
   }

   const data = searchedData.filter((value) => {
    if (search === '') {
      return value
    }
    return value.name.toLowerCase().includes(search.toLowerCase())
  })


  return (
    <>
      <label>Search</label>
      <input value={ search } type="text" placholder="Search..." onChange={handleInput} />
      { 
      <ActivitiesList activities={data} />
      }
    </>
  );
}

export default Search;