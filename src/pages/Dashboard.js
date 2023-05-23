import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation'
import DashboardLeftSection from '../components/DashboardLeftSection';
import DashboardRightSection from '../components/DashboardRightSection';
import FooterSection from '../components/FooterSection'
import './Dashboard.css';

export const DashboardContext = createContext();

const Dashboard = () => {

    const getUserApi = `http://localhost:8000/api/v1/user/data`;
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const [ dashboardMenu, setDashboardMenu ] = useState('myBookings');
    const [ userdata, setUserdata ] = useState({ userId: '', username: '' });

    useEffect(() => {
        axios.get( getUserApi, config ).then( response => {
            setUserdata(response.data.data);
        }).catch((error) => {
            console.error(error);
        });
    },[]);

    let myPassengers = false;
    let myBookings = false;
    if ( dashboardMenu === 'myBookings' ) {
        myPassengers = false;
        myBookings = true;
    } else if( dashboardMenu === 'myPassengers' ) {
        myBookings = false;
        myPassengers = true;
    } else {
        myPassengers = false;
        myBookings = true;
    }

    return (
        <DashboardContext.Provider value={{ dashboardMenu, setDashboardMenu, userdata, setUserdata }}>
            <Navigation />
            <section className='dashboard-wrap app-container'>
                <div className='dashboard-wrap-content d-flex justify-content-center'>
                    <div className='dashboard-content container'>
                        <div className='row'>
                            <div className='dashboard-left col-2'>
                                <DashboardLeftSection />
                            </div> {/* <!-- dashboard-left --> */}
                            <div className='dashboard-right col'>
                                {
                                    myBookings &&
                                    <DashboardRightSection />
                                }
                            </div> {/* <!-- dashboard-right --> */}
                        </div>
                    </div>
                </div>
            </section>
            <FooterSection />
        </DashboardContext.Provider>
    )
}

export default Dashboard
