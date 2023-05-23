import React from 'react'
import Navigation from '../components/Navigation';
import FooterSection from '../components/FooterSection';

const Hotels = () => {
  return (
    <>
        <Navigation />
        <section className='app-container flex-full-center bd-black hero-full-vh'>
            <div className='app-content flex-full-center flex-column'>
                <h1>Hotel page.</h1>
            </div>
        </section>
        <FooterSection />
    </>
  )
}

export default Hotels
