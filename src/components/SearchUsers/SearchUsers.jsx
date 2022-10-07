import { useState } from 'react';
//import ActivityCard from '../ActivityCard/ActivityCard';
import UserCard from '../UserCard/UserCard';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function SearchUsers(props) {
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
      <input value={ search } type="text" placeholder="Search friends..." onChange={handleInput} />
      {search && 
      <div className='searched-users'>
        {data.map(user => {
            return <Link key={uuidv4()} to={`/profile/${user._id}`}>
            <UserCard user={user} />
            </Link> 
        }) }
      </div>
       
      }
    </>
  );
}

export default SearchUsers;