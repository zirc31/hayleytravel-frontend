import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import apiData from '../data/fetchedApiAmadeus.json';

const reducer = ( state, action) => {
    switch( action.type ){
        case 'IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_FLIGHT_API_DATA':
            return {
                ...state,
                flightApi: action.payload
            };
        case 'SET_API_DETAILS':
            return {
                ...state,
                apiDetails: action.payload
            };
        case 'TO_JSON':
            return {
                ...state,
                thisJson: action.payload
            };
        default:
            return state;
    }
}

const initialState = {
    isLoading: true,
    flightApi: [],
    apiDetails: '',
    thisJson: ''
};

const objToJson = (objectData) => {
    const isJson = JSON.stringify(objectData);
    return isJson;
};

// const axios = require('axios');

const SearchFlightsApi = () => {
    // console.log("fetchedData: ", fetchedData);

    // All states here.
    const [ state, dispatch ] = useReducer( reducer, initialState);

    // Dummy Data
    useEffect(() => {
        dispatch({ type: 'SET_API_DETAILS', payload: apiData.dictionaries });
        dispatch({ type: 'SET_FLIGHT_API_DATA', payload: apiData.data });
    }, []);

    console.log("state.flightApi: ", state.flightApi);
    console.log("state.apiDetails: ", state.apiDetails);

  return (
    <>
        <p>
            {(state.flightApi === '' ? "loading" : state.flightApi.map( data => {
                return  <div key={data.id} className='bd-gray mg-all-10'>
                            <div className='flex-full-center pd-all-10'>
                                <div className='pd-all-10 mg-all-10'>
                                    {state.apiDetails.carriers.CX}
                                </div>                            
                                <div className='pd-all-10 mg-all-10 bd-gray'>
                                    {data.itineraries[0].segments[0].operating.carrierCode}
                                    &nbsp;
                                    {data.itineraries[0].segments[0].number}
                                    <br />
                                    Departure:&nbsp;
                                    {data.itineraries[0].segments[0].departure.iataCode}
                                    &nbsp;- Terminal&nbsp;
                                    {data.itineraries[0].segments[0].departure.terminal}
                                    &nbsp;@&nbsp;
                                    {data.itineraries[0].segments[0].departure.at}<br />
                                    Arrival:&nbsp;
                                    {data.itineraries[0].segments[0].arrival.iataCode}
                                    &nbsp;- Terminal&nbsp;
                                    {data.itineraries[0].segments[0].arrival.terminal}
                                    &nbsp;@&nbsp;
                                    {data.itineraries[0].segments[0].arrival.at}<br />
                                    Duration:&nbsp;
                                    {data.itineraries[0].segments[0].duration}
                                    &nbsp;|&nbsp;
                                    Stop:&nbsp;
                                    {data.itineraries[0].segments[0].numberOfStops} stops
                                </div>
                                <div className='pd-all-10 mg-all-10 bd-gray'>
                                    {data.itineraries[0].segments[1].operating.carrierCode}
                                    &nbsp;
                                    {data.itineraries[0].segments[1].number}
                                    <br />
                                    Departure:&nbsp;
                                    {data.itineraries[0].segments[1].departure.iataCode}
                                    &nbsp;- Terminal&nbsp;
                                    {data.itineraries[0].segments[1].departure.terminal}
                                    &nbsp;@&nbsp;
                                    {data.itineraries[0].segments[1].departure.at}<br />
                                    Arrival:&nbsp;
                                    {data.itineraries[0].segments[1].arrival.iataCode}
                                    &nbsp;- Terminal&nbsp;
                                    {data.itineraries[0].segments[1].arrival.terminal}
                                    &nbsp;@&nbsp;
                                    {data.itineraries[0].segments[1].arrival.at}<br />
                                    Duration:&nbsp;
                                    {data.itineraries[0].segments[1].duration}
                                    &nbsp;|&nbsp;
                                    Stop:&nbsp;
                                    {data.itineraries[0].segments[1].numberOfStops} stops
                                </div>
                                <br /><br />
                            </div>
                        </div>
            }))}
        </p>
    </>
  )
}

export default SearchFlightsApi
