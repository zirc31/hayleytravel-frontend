import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../pages/Dashboard';
import './DashboardRightSection.css';

const DashboardRightSection = () => {

    const navigate = useNavigate();

    const context = useContext( AppContext );

    const dashContext = useContext( DashboardContext );
   
    if ( context.isTokenExist ) {
        return (
            <>
                {
                    context.flightBooking &&
                    <div className="user-booking-content">
                        <div className="">
                            <div className="">
                                <div className="">
                                    <span><strong><small>Pending Booking</small></strong></span>
                                </div>
                                <hr />
                                <div><h6>Passenger Details</h6></div>
                                <div className='mg-l-15 mg-r-15 pd-all-15'>
                                    <ul>
                                        {
                                            context.passengerData &&
                                            context.passengerData.map( (data) => (
                                                <li>{data.lastName}, {data.firstName} {data.middleName} {data.sex}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div><h6>Flight Details</h6></div>
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
                                    <hr />
                                    <button type="button" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => navigate('/booking?proceed=flights') } >Proceed With This Booking ?</button>
                                    <button type="button" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ () => navigate('/flights') } >Or Search For New One ?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className=""></div>
                <div className="user-booking-content">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Booking Details</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>2023-05-14</td>
                                <td>Flight</td>
                                <td>Details</td>
                                <td>Reserved</td>
                                <td>
                                    <button className="btn btn-sm btn-primary" ><i className="far fa-edit"></i> Rebook</button> &nbsp;
                                    <button className="btn btn-sm btn-danger" ><i className="fas fa-trash-alt"></i> Cancel</button> &nbsp;   
                                    <button className="btn btn-sm btn-info" ><i className="fas fa-info-circle"></i> View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default DashboardRightSection;