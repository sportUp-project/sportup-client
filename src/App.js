import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import Homepage from './pages/HomePage'
import Navbar from './components/Navbar/Navbar'
import ProfilePage from './pages/ProfilePage'
import ProfileEditPage from './pages/ProfileEditPage'
import ActivitiesAdd from './pages/ActivitiesAdd';
import ActivityDetails from './pages/ActivityDetails'
import ActivitiesMainPage  from './pages/ActivitiesMainPage';
import SportMainPage from './pages/SportMainPage';
import FollowingOverveiw from './pages/FollowingOverveiw';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Homepage />} />
        <Route path={'/login'} element={<LoginPage/>} />
        <Route path={'/signup'} element={<SignupPage />} />
        <Route path={'/profile/:id/'} element={<ProfilePage />} />
        <Route path={'/profile/:id/edit'} element={<ProfileEditPage />} />
        <Route path={'/activities/'} element={<ActivitiesMainPage />} />
        <Route path={'/activities/add'} element={<ActivitiesAdd />} />
        <Route path={'/activities/:id'} element={<ActivityDetails />} />
        <Route path={'/activities/sport/:id'} element={<SportMainPage />} />
        <Route path={'/profile/:id/following'} element={<FollowingOverveiw />} />
      </Routes>
    </div>
  );
}

export default App;
