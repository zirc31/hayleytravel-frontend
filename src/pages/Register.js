import React from 'react'
import Navigation from '../components/Navigation';
import RegisterSection from '../components/RegisterSection';
import FooterSection from '../components/FooterSection';
import './Register.css';

const Register = () => {

  return (
    <>
        <Navigation />
        <section className='register-wrap app-container flex-full-center'>
            <div className='register-wrap-content flex-full-center justify-content-center bd-black'>
              <RegisterSection />
            </div>
        </section>
        <FooterSection />
    </>
  )
}

export default Register
