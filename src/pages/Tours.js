import React from 'react';
import Navigation from '../components/Navigation';
import FooterSection from '../components/FooterSection';

const Tours = () => {
  return (
    <>
        <Navigation />
        <section className='app-container flex-full-center bd-black hero-full-vh'>
            <div className='app-content flex-full-center flex-column hero'>
                <h1>Tours page.</h1>
            </div>
        </section>
        <FooterSection />
    </>
  )
}

export default Tours
