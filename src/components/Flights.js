import React from 'react'
import Navigation from '../components/Navigation'
import FooterSection from '../components/FooterSection';
import SearchFlightsApi from '../components/SearchFlightsApi';

const Flights = () => {

  return (
    <>
        <Navigation />
        <section className='app-container flex-full-center bd-black'>
            <div className='app-content'>
                <h1>Flight Searched Page.</h1>
                <div>
                  <SearchFlightsApi />
                </div>
            </div>
        </section>
        <FooterSection />
    </>
  )
}

export default Flights