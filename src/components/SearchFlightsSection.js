import React from 'react'
import SearchForm from './SearchForm';
import './SearchFlightsSection.css';

const SearchFlightsSection = (data, fetchedData) => {

  return (
    <>
        <section className='app-container flex-full-center bd-black'>
            <div className='app-content flex-left flex-column'>
                <form className='full-width tx-align-l'>
                    <h1>Search Flights</h1>
                    <SearchForm airlineCode={data.airlineCode} />
                </form>
            </div>
        </section>
    </>
  )
}

export default SearchFlightsSection
