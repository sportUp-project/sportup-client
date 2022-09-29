import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/login'} element={<LoginPage/>} />
        <Route path={'/signup'} element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
