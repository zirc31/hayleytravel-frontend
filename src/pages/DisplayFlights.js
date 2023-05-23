import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../App';
import Navigation from '../components/Navigation';
import FooterSection from '../components/FooterSection';

const DisplayFlights = () => {

    const navigate = useNavigate();

    const [ fetchData, setFetchData ] = useState([]);

    const context = useContext( AppContext );

    const queryParams = new URLSearchParams(window.location.search);
    const queryOriginLocationCode = queryParams.get("originLocationCode");
    const queryDestinationLocationCode = queryParams.get("destinationLocationCode");
    const queryDepartureDate = queryParams.get("departureDate");
    const queryReturnDate = queryParams.get("returnDate");
    const queryAdults = parseInt(queryParams.get("adults"));
    const queryChildren = parseInt(queryParams.get("children"));
    const queryInfants = parseInt(queryParams.get("infants"));
    const queryTravelClass = queryParams.get("travelClass");
    const queryNonStop = queryParams.get("nonStop");
    const queryCurrencyCode = queryParams.get("currencyCode");
    const queryMax = parseInt(queryParams.get("max"));
    // const queryDev = queryParams.get("dev"); // for dev purpose

    const numberOfPax = queryAdults + queryChildren + queryInfants;
    context.setNumberOfPax(numberOfPax);
    // console.log('context.numberOfPax: ', context.numberOfPax); // dev

    // Direct Flights
    // const flightApiUrlProd = `http://localhost:8000/api/v1/search/flight?originLocationCode=${queryOriginLocationCode}&destinationLocationCode=${queryDestinationLocationCode}&departureDate=${queryDepartureDate}&returnDate=${queryReturnDate}&adults=${queryAdults}&children=${queryChildren}&infants=${queryInfants}&travelClass=${queryTravelClass}&nonStop=${queryNonStop}&currencyCode=${queryCurrencyCode}&max=${queryMax}`;
    // Flights with more than one stop.
    const flightApiUrlProd = `http://localhost:8000/api/v1/search/flight?originLocationCode=${queryOriginLocationCode}&destinationLocationCode=${queryDestinationLocationCode}&departureDate=${queryDepartureDate}&returnDate=${queryReturnDate}&adults=${queryAdults}&children=${queryChildren}&infants=${queryInfants}&travelClass=${queryTravelClass}&nonStop=false&currencyCode=${queryCurrencyCode}&max=${queryMax}`;
    // const flightApiUrlDev = `http://localhost:8000/api/v1/search/flight?originLocationCode=${queryOriginLocationCode}&destinationLocationCode=${queryDestinationLocationCode}&departureDate=${queryDepartureDate}&returnDate=${queryReturnDate}&adults=${queryAdults}&children=${queryChildren}&infants=${queryInfants}&travelClass=${queryTravelClass}&nonStop=${queryNonStop}&currencyCode=${queryCurrencyCode}&max=${queryMax}&dev=demo`;

    // API to fetch from Back-end
    // `http://localhost:8000/api/v1/search/flight?originLocationCode=MNL&destinationLocationCode=BKK&departureDate=2023-07-15&returnDate=2023-07-18&adults=1&children=0&infants=0&travelClass=ECONOMY&nonStop=true&currencyCode=PHP&max=100&dev=demo`;

    // URL in front-end
    // http://localhost:3000/flight/search?originLocationCode=MNL&destinationLocationCode=BKK&departureDate=2023-07-15&returnDate=2023-07-18&adults=1&children=0&infants=0&travelClass=ECONOMY&nonStop=true&currencyCode=PHP&max=100

    useEffect(() => {
        // axios.get( flightApiUrlDev ).then( response => {
        axios.get( flightApiUrlProd ).then( response => {
            console.log( response.data.data.data );
            // console.log( response.data);
            // console.log( response.headers );

            // setFetchData( response.data.data[0].data.data ); // if dummy data
            setFetchData( response.data.data.data ); // if will use live Api
        }).catch((error) => {
            console.error(error);
        });
    },[]);

    const bookThisFlight = ( thisData ) => {
        context.setFlightBooking( thisData );
    };

    const cancelBookingHandler = () => {
        context.setFlightBooking(undefined);
    }

    return (
        <>
            {
                context.flightBooking &&
                <div className='modal-container modal-full-h'>
                    <div className='modal-content modal-style-1 flex-full-center'>
                        <div className='modal-panel text-center'>
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
                            <button type="button" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => navigate('/flight/booking') }>Confirm Flights</button>
                            <button type="button" class="modal-btn btn btn-secondary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => cancelBookingHandler() }>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            <Navigation />
            <div className='container'>
                <div className='row'>
                    <table class="table">
                    <thead>
                    <tr>
                    <th scope="col" className='text-center'>Departure</th>
                    <th scope="col" className='text-center'>Return</th>
                    <th scope="col" className='text-center'>Other details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ( fetchData === '' ? "loading" : fetchData.map( data => {
                        return <>
                                <tr key={data.id} className='get-full-height'>
                                    <td className='text-center '>
                                        <br />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16"><path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/></svg> &nbsp;
                                        <strong>{ data.itineraries[0].segments[0].carrierCode }-{ data.itineraries[0].segments[0].aircraft.code }</strong><br />
                                        <strong>{ data.itineraries[0].segments[0].departure.iataCode }</strong> Terminal { data.itineraries[0].segments[0].departure.terminal }
                                        &nbsp;to&nbsp;
                                        <strong>{ data.itineraries[0].segments[0].arrival.iataCode }</strong> Terminal { data.itineraries[0].segments[0].arrival.terminal }<br />
                                        Departing at:&nbsp;
                                        { data.itineraries[0].segments[0].departure.at }<br />
                                        Arrival at:&nbsp;
                                        { data.itineraries[0].segments[0].arrival.at }<br />
                                        { data.itineraries[0].segments[0].numberOfStops } stops, { data.itineraries[0].duration } duration<br />
                                        { data.travelerPricings[0].fareDetailsBySegment[0].cabin } -&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].class } -&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].fareBasis } -&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight }&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weightUnit }
                                        <br /><br />
                                    </td>
                                    <td className='text-center'>
                                        <br />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16"><path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/></svg> &nbsp;
                                        <strong>{ data.itineraries[1].segments[0].carrierCode }-{ data.itineraries[1].segments[0].aircraft.code}</strong><br />
                                        <strong>{ data.itineraries[1].segments[0].departure.iataCode }</strong> Terminal { data.itineraries[1].segments[0].departure.terminal }
                                        &nbsp;to&nbsp;
                                        <strong>{ data.itineraries[1].segments[0].arrival.iataCode }</strong> Terminal { data.itineraries[1].segments[0].arrival.terminal }<br />
                                        Departing at:&nbsp;
                                        { data.itineraries[1].segments[0].departure.at }<br />
                                        Arrival at:&nbsp;
                                        { data.itineraries[1].segments[0].arrival.at }<br />
                                        { data.itineraries[1].segments[0].numberOfStops } stops, { data.itineraries[1].duration } duration<br />
                                        { data.travelerPricings[0].fareDetailsBySegment[0].cabin } -&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].class } -&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].fareBasis } -&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight }&nbsp;
                                        { data.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weightUnit }
                                        <br /><br />
                                    </td>
                                    <td className='text-center'>
                                        <br />
                                        Total price: <strong>{ data.price.currency } { data.price.grandTotal }</strong><br />
                                        Available seats:&nbsp;
                                        { data.numberOfBookableSeats }<br />
                                        <button type="button" class="btn btn-primary btn-sm px-4 me-md-2 fw-bold" onClick={ () => bookThisFlight(data) }>Book this flight</button>
                                    </td>
                                </tr>
                        </>
                        }))
                    }
                    </tbody>
                    </table>
                </div> {/* --- div 'row' --- */}
            </div>
            <FooterSection />
        </>
    )
}

export default DisplayFlights;
