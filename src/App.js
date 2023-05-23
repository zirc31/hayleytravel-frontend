import React from 'react';
import { useState, useEffect, createContext } from 'react';
import {  Routes,
          Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Guide from './pages/Guide';
import Flights from './pages/Flights';
import Tours from './pages/Tours';
import Hotels from './pages/Hotels';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DisplayFlights from './pages/DisplayFlights';
import BookingFlights from './pages/BookingFlights';
import SearchSignupLogin from './components/SearchSignupLogin';
import BookingProceed from './components/BookingProceed';
import NotFound from './pages/NotFound';
import './App.css';

export const AppContext = createContext();

const App = () => {

  const [ isTokenExist, setIsTokenExist  ] = useState(false);
  const [ userData, setUserData  ] = useState([{
    id: '',
    username: ''
  }]);
  const [ flightBooking, setFlightBooking ] = useState(null);
  const [ passengerData, setPassengerData ] = useState([]);
  const [ numberOfPax, setNumberOfPax ] = useState(0);

  useEffect(() => {
    if( localStorage.getItem("token") === null ) {
    } else {
        setIsTokenExist(true);
    }
  },[]);

  return (
    <AppContext.Provider value={{
        isTokenExist, setIsTokenExist,
        flightBooking, setFlightBooking,
        userData, setUserData,
        passengerData, setPassengerData,
        numberOfPax, setNumberOfPax }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage /> } />
          <Route path='/guide' element={<Guide /> } />
          <Route path='/flights' element={<Flights /> } />
          <Route path='/flight/search' element={<DisplayFlights /> } />
          <Route path='/flight/booking' element={<BookingFlights /> } />
          <Route path='/newsearch' element={<SearchSignupLogin /> } />
          <Route path='/booking' element={<BookingProceed /> } />
          <Route path='/hotels' element={<Hotels /> } />
          <Route path='/tours' element={<Tours /> } />
          <Route path='/login' element={<Login /> } />
          <Route path='/register' element={<Register /> } />
          <Route path='/dashboard' element={<Dashboard /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
