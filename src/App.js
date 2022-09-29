import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import Homepage from './pages/HomePage'
import Navbar from './components/Navbar/Navbar'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Homepage />} />
        <Route path={'/login'} element={<LoginPage/>} />
        <Route path={'/signup'} element={<SignupPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
