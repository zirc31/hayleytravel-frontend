import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FooterSection from '../components/FooterSection';

const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 1000);
    },[]);

  return (
    <>
        <Navigation />
        <section className='app-container flex-full-center hero-full-vh'>
            <div className='app-content flex-full-center flex-column'>
                <h1>Page not Found!</h1>
                <button
                onClick={ () => navigate('/') }
                >
                    Back to Home
                </button>
            </div>
        </section>
        <FooterSection />
    </>
  )
}

export default NotFound
