import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router ,Route,Routes ,Link} from 'react-router-dom';
import Home from './homeScreen/Home';
import BookingScreen from './homeScreen/BookingScreen';
import RegisterPage from './homeScreen/RegisterPage';
import Loginpage from './homeScreen/Loginpage';
import Profile from './homeScreen/Profile';
import Admin from './homeScreen/Admin';
import HomeScreen from './homeScreen/HomeScreen';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Router>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<Loginpage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/admin" element={<Admin/>} />
      </Routes>
      </Router>
      </div>
  )
}

export default App
