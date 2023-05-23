import React from 'react';
import Navigation from '../components/Navigation'
import FooterSection from '../components/FooterSection'
import SearchFlightsSection from '../components/SearchFlightsSection'
import airlineCodeData from '../data/airlineCode.json';

const Flights = () => {

    return (
        <>
            <Navigation />
            <SearchFlightsSection airlineCode={airlineCodeData} />
            <FooterSection />
        </>
    )
}

export default Flights
