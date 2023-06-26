import React from 'react';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Navigation from './Navigation';
import FooterSection from './FooterSection';
import axios from 'axios';
const {v4: uuidv4 } = require('uuid');

const endPointUrl = process.env.REACT_APP_ENDPOINT_URL;
// ${endPointUrl}

const BookingProceed = () => {

    const context = useContext( AppContext );

    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const queryProceed = queryParams.get("proceed");

    useEffect(()=>{
        if( !context.isTokenExist ) {
            navigate('/newsearch');
        }
    },[]);

    const genBookingId = `Bid-` + uuidv4();
    localStorage.setItem('genBookingId', genBookingId );

    const getBookingApi = `${endPointUrl}/api/v1/booking`;
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    if( queryProceed === 'flights' ) {
        const genBookingId = localStorage.getItem('genBookingId');
        axios.post( getBookingApi, { genBookingId }, config ).then( response => {
            localStorage.setItem('genBookingId', null );
            if( response.status === 201 ){
                console.log( response );
            } else if( response.status === 401 ){
                navigate('/newsearch');
            } else {
                navigate('/newsearch');
            }
        }).catch((error) => {
            navigate('/newsearch');
        });
    } else {
        navigate('/newsearch');
    }

    return (
        <>
            <Navigation />
                <section className='section-wrap app-container full-width full-height-vh bckgrnd-booking'>
                    <div className='section-wrap-content d-flex justify-content-center'>
                        <div className='section-content container'>
                            <div className='full-width full-height-vh'>
                                {
                                    !queryProceed &&
                                    <div className='content-container'>
                                        <div className='full-width flex-full-center'>
                                            <div className='content-body auto-wh'>
                                                <div className='mg-b-10'>
                                                    <strong>Login or Sign-up to continue booking.</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            <FooterSection />
        </>
    )
}

export default BookingProceed;
