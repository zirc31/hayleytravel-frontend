import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import Navigation from '../components/Navigation';
import AddPassengerModal from '../modal/AddPassengerModal';
import FooterSection from '../components/FooterSection';

export const BookingContext = createContext();

const moment = require('moment');

const BookingFlights = () => {

    const context = useContext( AppContext );

    const navigate = useNavigate();

    const [ timeClock, setTimeClock ] = useState(new Date().toLocaleString());
    const [ bookingError, setBookingError] = useState('');
    const [ toggleAddPax, setToggleAddPax ] = useState(false);
    const [ allPaxAdded, setAllPaxAdded ] = useState(false);

    setTimeout( () => {
        // setTimeClock(new Date().toLocaleString());
        moment.locale('tl-ph');
        setTimeClock(moment().format());
    }, 1000 );

    // everytime "passengerData" state is updated, will set "toggleAddPax" to false so the modal will be removed.
    useEffect(()=>{
        setToggleAddPax(false);
        if( context.passengerData.length === context.numberOfPax ){
            setAllPaxAdded(true);
        }
    },[context.passengerData]);

    const addPaxHandler = () => {
        setToggleAddPax(true);
    };

    const cancelHandler = () => {
        context.setFlightBooking(undefined);
        navigate('/flights');
    };


    return (
        <>
            <Navigation />
                <section className='section-wrap app-container full-width full-height-vh bckgrnd-booking'>
                    <div className='section-wrap-content d-flex justify-content-center'>
                        <div className='section-content container'>
                            <div className='full-width full-height-vh'>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    context.flightBooking &&
                    <div className='content-over full-width full-height-vh flex-full-center'>
                        <div className='content-container'>
                            <div className='full-width flex-full-center'>
                                <div className='content-body auto-wh'>
                                    <div className='mg-b-10'>
                                        <strong>Booking Details</strong>
                                        <div className='mg-t-10 mg-b-10'>
                                            <div className='pd-all-10'>
                                                BID: [Confirm booking to generate Booking ID]<br />
                                                Time: { timeClock }
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='mg-t-10 mg-b-10'>
                                        <strong>Passenger Details</strong> [{context.passengerData.length}/{context.numberOfPax}]
                                        <div className='mg-l-15 mg-r-15 pd-all-15'>
                                            <ul>
                                                {
                                                    !context.passengerData &&
                                                    <li>Add passenger to proceed.</li>
                                                }
                                                {
                                                    context.passengerData &&
                                                    context.passengerData.map( (data) => (
                                                        <li>{data.lastName}, {data.firstName} {data.middleName} {data.sex}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='mg-t-10 mg-b-10'>
                                        <strong>Flights Details</strong>
                                    </div>
                                    <div className='mg-t-10 mg-b-10'>
                                        <div className='flex-full-center'>
                                            <div className='pd-all-10'>
                                                <strong>Departure:</strong><br />
                                                {context.flightBooking.itineraries[0].segments[0].carrierCode} {context.flightBooking.itineraries[0].segments[0].aircraft.code} &nbsp;&nbsp; {context.flightBooking.itineraries[0].segments[0].departure.iataCode} - {context.flightBooking.itineraries[0].segments[0].arrival.iataCode}<br />
                                                ETD: {context.flightBooking.itineraries[0].segments[0].departure.at}<br />
                                                ETA: {context.flightBooking.itineraries[0].segments[0].arrival.at}<br />
                                            </div>
                                            <div className='pd-all-10'>
                                                <strong>Return:</strong><br />
                                                {context.flightBooking.itineraries[1].segments[0].carrierCode} {context.flightBooking.itineraries[1].segments[0].aircraft.code} &nbsp;&nbsp; {context.flightBooking.itineraries[1].segments[0].departure.iataCode} - {context.flightBooking.itineraries[1].segments[0].arrival.iataCode}<br />
                                                ETD: {context.flightBooking.itineraries[1].segments[0].departure.at}<br />
                                                ETA: {context.flightBooking.itineraries[1].segments[0].arrival.at}<br />
                                            </div>
                                        </div>
                                        <div className='flex-full-center'>
                                            Total Price: &nbsp; <strong>{context.flightBooking.price.currency} {context.flightBooking.price.grandTotal}</strong>
                                        </div>
                                    </div>
                                    <hr />
                                    {
                                        bookingError &&
                                        <div className='mg-t-10 mg-b-10 flex-full-center bd-red'>
                                            <small>Error message here.</small>
                                        </div>
                                    }
                                    {
                                        !allPaxAdded &&
                                        <button type="button" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => addPaxHandler() } >Add passenger</button>
                                    }
                                    {
                                        allPaxAdded &&
                                        <button type="button" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => navigate('/booking?proceed=flights') } >Confirm booking</button>
                                    }
                                    <button type="button" class="modal-btn btn btn-secondary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => cancelHandler() } >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            <FooterSection />
            {
                toggleAddPax &&
                <AddPassengerModal toggleAddPax={ toggleAddPax } setToggleAddPax={ setToggleAddPax }  />
            }
        </>
    )
}

export default BookingFlights;
