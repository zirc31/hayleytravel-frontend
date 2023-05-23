import React from 'react'
import Navigation from '../components/Navigation'
import FooterSection from '../components/FooterSection';
import SearchFlightsSection from '../components/SearchFlightsSection';
import airlineCodeData from '../data/airlineCode.json';
import fetchedData from '../data/fetchedApi.json';


const Airline = () => {
  return (
    <>
        <Navigation />
        <section className='app-container flex-full-center bd-black hero-full-vh'>
            <div className='app-content flex-full-center flex-column'>
              <SearchFlightsSection airlineCode={airlineCodeData} fetchedData={fetchedData}/>
            </div>
        </section>
        <FooterSection />
    </>
  )
}

export default Airline
