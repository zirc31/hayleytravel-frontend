import React from 'react'
import LoginSection from '../components/LoginSection';
import Navigation from '../components/Navigation';
import FooterSection from '../components/FooterSection';
import './Login.css';

const Login = () => {

  return (
    <>
      <Navigation />
      <section className='loginbgb-wrap app-container flex-full-center hero'>
        <div className='loginbgb-wrap-content d-flex justify-content-center'>
          <LoginSection />
        </div>
      </section>
      <FooterSection />
    </>
  )
}

export default Login