import React from 'react'
import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const reducer = ( state, action) => {
    switch( action.type ){
        case 'IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'UPDATE_ORIGIN':
            return {
                ...state,
                origin: action.payload
            };
        case 'UPDATE_ORIGIN_CODE':
            return {
                ...state,
                originCode: action.payload
            };
        case 'UPDATE_DESTINATION':
            return {
                ...state,
                destination: action.payload
            };
        case 'UPDATE_DESTINATION_CODE':
            return {
                ...state,
                destinationCode: action.payload
            };
        case 'UPDATE_TRAVEL_CLASS':
            return {
                ...state,
                travelClass: action.payload
        };
        case 'UPDATE_FLIGHT_TYPE':
            return {
                ...state,
                flightType: action.payload
        };
        case 'UPDATE_ORIGIN_DATE':
            return {
                ...state,
                originDate: action.payload
        };
        case 'UPDATE_RETURN_DATE':
            return {
                ...state,
                returnDate: action.payload
        };
        case 'UPDATE_ADULT':
            return {
                ...state,
                adult: action.payload
        };
        case 'UPDATE_CHILD':
            return {
                ...state,
                child: action.payload
        };
        case 'UPDATE_INFANT':
            return {
                ...state,
                infant: action.payload
            };
        default:
            return state;
    }
}

const initialState = {
    isLoading: true,
    origin: '',
    originCode: '',
    destination: '',
    destinationCode: '',
    travelClass: 'ECONOMY',
    flightType: 'one-way',
    originDate: '',
    returnDate: '',
    adult: '',
    child: 0,
    infant: 0
};


const SearchForm = (data) => {

    const [ flightState, setFlightState ] = useState('');

    // go to flight page
    const navigate = useNavigate();

    const flights = data.airlineCode;

    // All states here.
    const [ state, dispatch ] = useReducer( reducer, initialState);
    
    // for Airport List suggestion.
    const [ suggestList, setSuggestList ] = useState([]);

    const handleChangeLocation = (event, location) => {
        const results = flights.filter(flight => {
            if (event.target.value === "") return flights
            return flight.info.toLowerCase().includes(event.target.value.toLowerCase())
        })
        if( location == 'origin' ) {
            dispatch({ type: 'UPDATE_ORIGIN', payload: event.target.value });
        } else {
            dispatch({ type: 'UPDATE_DESTINATION', payload: event.target.value });
        }
        setSuggestList(results);

        // delay 1.5seconds before showing List of Airport details.
        const thisTimeout = setTimeout(displayFlightList, 500);
        function displayFlightList() {
            clearTimeout(thisTimeout);
            let flightListContainer = null;
            if( location == 'origin' ) {
                flightListContainer = document.querySelector('.suggest-from');
            } else {
                flightListContainer = document.querySelector('.suggest-to');
            }
            flightListContainer.classList.remove(`hide`);
            flightListContainer.addEventListener('click', () => {
                flightListContainer.classList.add(`hide`);
            });
            document.addEventListener('click', () => {
                flightListContainer.classList.add(`hide`);
            });
        };
    };
    const selectLocation = (selectedLocationCode, selectedLocation, locationFor) => {
        if( locationFor == 'origin' ) {
            dispatch({ type: 'UPDATE_ORIGIN', payload: selectedLocation });
            dispatch({ type: 'UPDATE_ORIGIN_CODE', payload: selectedLocationCode });
        } else {
            dispatch({ type: 'UPDATE_DESTINATION', payload: selectedLocation });
            dispatch({ type: 'UPDATE_DESTINATION_CODE', payload: selectedLocationCode });
        }
    };

    const handleChangeTravelClass = (e) => {
        dispatch({ type: 'UPDATE_TRAVEL_CLASS', payload: e.target.value });
    };

    const handleChangeFlightType = (e) => {
        const returnDate = document.querySelector('.return-date');
        if (e.target.value === "one-way") {
            returnDate.classList.add("d-none");
        } else {
            returnDate.classList.remove("d-none");
        }
        dispatch({ type: 'UPDATE_FLIGHT_TYPE', payload: e.target.value });
    };

    const handleChangeOriginDate = (e) => {
        dispatch({ type: 'UPDATE_ORIGIN_DATE', payload: e.target.value });
    }

    const handleChangeReturnDate = (e) => {
        dispatch({ type: 'UPDATE_RETURN_DATE', payload: e.target.value });
    }

    const handleChangeAdult = (e) => {
        dispatch({ type: 'UPDATE_ADULT', payload: e.target.value });
    }
    const handleChangeChild = (e) => {
        dispatch({ type: 'UPDATE_CHILD', payload: e.target.value });
    }
    const handleChangeInfant = (e) => {
        dispatch({ type: 'UPDATE_INFANT', payload: e.target.value });
    }

    const handleClickSearchFlight = (e) => {
        e.preventDefault();
        const flightApiUrl = `/flight/search?originLocationCode=${state.originCode}&destinationLocationCode=${state.destinationCode}&departureDate=${state.originDate}&returnDate=${state.returnDate}&adults=${state.adult}&children=${state.child}&infants=${state.infant}&travelClass=${state.travelClass}&nonStop=false&currencyCode=PHP&max=100`;
        navigate(flightApiUrl);
    };

    return (
    <>
        <div className="container-sm">
            <div className="my-2 card">
                <div className="card-body">
                    <h5 className="card-title">Locations</h5>
                    <div className="row">
                        <div className="col-sm">
                            <div className="mb-2">
                                <label id="origin-label" className="form-label">Origin</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi-pin-map"></i></span>
                                    <input
                                        type="text"
                                        className="origin-input form-control"
                                        list="origin-options"
                                        id="origin-input"
                                        placeholder="Location"
                                        aria-describedby="origin-label"
                                        value={state.origin}
                                        onChange={event => handleChangeLocation(event, 'origin')}
                                        role="presentation" autoComplete="off"
                                        required
                                    />
                                    <datalist className='origin-options' id="origin-options"></datalist>
                                </div>
                                <div className='suggest-from bd-gray hide'>
                                    {(suggestList === [] ? "" : suggestList.map(flight => {
                                        return <p key={flight.info} onClick={()=>selectLocation(flight.iataCode,flight.info,'origin')}>{flight.info}</p>
                                    }))}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="mb-2">
                                <label id="destination-label" className="form-label">Destination</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi-pin-map-fill"></i></span>
                                    <input
                                        type="text"
                                        className="destination-input form-control"
                                        list="destination-options"
                                        id="destination-input"
                                        placeholder="Location"
                                        aria-describedby="destination-label"
                                        value={state.destination}
                                        onChange={event => handleChangeLocation(event, 'destination')}
                                        role="presentation" autoComplete="off"
                                        required
                                    />
                                    <datalist className='destination-options' id="destination-options"></datalist>
                                </div>
                                <div className='suggest-to bd-gray hide'>
                                    {(suggestList === [] ? "" : suggestList.map(flight => {
                                        return <p key={flight.info} onClick={()=>selectLocation(flight.iataCode,flight.info,'destination')}>{flight.info}</p>
                                    }))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="mb-2 col">
                    <div className="h-100 card">
                        <div className="card-body">
                            <h5 className="card-title">Dates</h5>
                            <div className="mb-2">
                                <label id="flight-type-label" className="form-label">Flight</label>
                                <select
                                    id="flight-type-select"
                                    className="flight-type-select form-select"
                                    aria-describedby="flight-type-label"
                                    value={state.flightType}
                                    onChange={handleChangeFlightType}
                                    required>
                                    <option value=""></option>
                                    <option value="one-way">One-way</option>
                                    <option value="round-trip">Round-trip</option>
                                </select>
                            </div>
                            <div id="departure-date" className="departure-date mb-2">
                                <label id="departure-date-label" className="form-label">Departure date</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi-calendar"></i></span>
                                    <input
                                        type="date"
                                        className="departure-date-input form-control"
                                        id="departure-date-input"
                                        aria-describedby="departure-date-label"
                                        value={state.originDate}
                                        onChange={handleChangeOriginDate}
                                        required
                                    />
                                </div>
                            </div>
                            <div id="return-date" className="return-date mb-2 d-none">
                                <label id="return-date-label" className="form-label">Return date</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi-calendar-fill"></i></span>
                                    <input
                                        type="date"
                                        className="return-date-input form-control"
                                        id="return-date-input"
                                        aria-describedby="return-date-label"
                                        value={state.returnDate}
                                        onChange={handleChangeReturnDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-2 col">
                    <div className="h-100 card">
                        <div className="card-body">
                            <h5 className="card-title">Details</h5>
                            <div className="mb-2">
                                <label id="travel-class-label" className="form-label">Travel class</label>
                                <select
                                    className="travel-class-select form-select"
                                    id="travel-class-select"
                                    aria-describedby="travel-class-label"
                                    value={state.travelClass}
                                    onChange={handleChangeTravelClass}
                                    required>
                                    <option value=""></option>
                                    <option value="ECONOMY">Economy</option>
                                    <option value="PREMIUM_ECONOMY">Premium Economy</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="FIRST">First</option>
                                </select>
                            </div>
                            <label className="form-label">Passengers</label>
                            <div className="mb-2">
                                <div className="input-group">
                                    <label className="input-group-text">Adults</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="adults-input form-control"
                                        id="adults-input"
                                        aria-describedby="adults-label"
                                        value={state.adult}
                                        onChange={handleChangeAdult}
                                        required
                                    />
                                </div>
                                <span id="adults-label" className="form-text">12 years old and older</span>
                            </div>
                            <div className="mb-2">
                                <div className="input-group">
                                    <label className="input-group-text">Children</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="children-input form-control"
                                        id="children-input"
                                        aria-describedby="children-label"
                                        value={state.child}
                                        onChange={handleChangeChild}
                                    />
                                </div>
                                <span id="children-label" className="form-text">2 to 12 years old</span>
                            </div>
                            <div className="mb-2">
                                <div className="input-group">
                                    <label className="input-group-text">Infants</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="infants-input form-control"
                                        id="infants-input"
                                        aria-describedby="infants-label"
                                        value={state.infant}
                                        onChange={handleChangeInfant}
                                    />
                                </div>
                                <span id="infants-label" className="form-text">Up to 2 years old</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button id="search-button" className="search-button w-100 btn btn-primary"
                onClick={handleClickSearchFlight}
            >Search</button>
        </div>
    </>
  )
}

export default SearchForm
