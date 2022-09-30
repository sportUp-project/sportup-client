
import { useState } from 'react';


function Search(props) {
    const [ searchedActivities, setSearchedActivities] = useState('')
    const { activities } = props;

    const handleInput = e => {
        setSearchedActivities(e.target.value);
        activities(e.target.value)
    }

  return (
    <>
      <label>Search</label>
      <input value={searchedActivities} type="text" onChange={handleInput} />
    </>
  );
}

export default Search;