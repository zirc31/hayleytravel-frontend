import React from 'react';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AppContext } from '../App';
import Navigation from './Navigation';
import FooterSection from './FooterSection';

const SearchSignupLogin = () => {;

    const navigate = useNavigate();

    const context = useContext( AppContext );

    useEffect(()=>{
        if( context.isTokenExist ) {
            navigate('/dashboard');
        }
    },[]);

    return (
        <>
            <Navigation />
                <section className='section-wrap app-container full-width full-height-vh bckgrnd-booking'>
                    <div className='section-wrap-content d-flex justify-content-center'>
                        <div className='section-content container'>
                            <div className='full-width full-height-vh'>
                                <div className='content-container'>
                                    <div className='full-width flex-full-center'>
                                        <div className='content-body auto-wh'>
                                            <div className='mg-b-10'>
                                                <strong><Link to="/register">Sign-up</Link> or <Link to="/login">Login</Link> to continue booking.</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <FooterSection />
        </>
    )
}

export default SearchSignupLogin;