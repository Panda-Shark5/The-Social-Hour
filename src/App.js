import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import FeedPage from './components/FeedPage'
import ProfilePage from './components/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/profile' element={<ProfilePage/>}/>
        <Route exact path='/feed' element={<FeedPage/>}/>
        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route path='*' element={<Navigate to='/login' replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
