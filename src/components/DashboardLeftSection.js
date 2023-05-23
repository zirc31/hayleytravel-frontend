import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { DashboardContext } from '../pages/Dashboard';


const DashboardLeftSection = () => {

    const context = useContext( AppContext );
    const dashContext = useContext( DashboardContext );

    const navigate = useNavigate();

    const activeMenuSetToBookingsHandler = () => {
        dashContext.setDashboardMenu('myBookings');
    }

    const activeMenuSetToPassengersHandler = () => {
        dashContext.setDashboardMenu('myPassengers');
    }

    let myPassengers = false;
    let myBookings = false;
    if ( dashContext.dashboardMenu === 'myBookings' ) {
        myPassengers = false;
        myBookings = true;
    } else if( dashContext.dashboardMenu === 'myPassengers' ) {
        myBookings = false;
        myPassengers = true;
    } else {
        myPassengers = false;
        myBookings = true;
    }

    const onLoginHandler  = () => {
        navigate('/login');
    };

    const onLogoutHandler = () => {
        // removed token on logout.
        localStorage.removeItem("token");
        // set isTokenExist to false on logout.
        context.setIsTokenExist(false);
        // redirect to /login page.
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
                <div className="dropdown">
                <a className="d-flex align-items-center link-body-emphasis text-decoration-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    {
                        !context.isTokenExist &&
                        <strong className='icon-pd'>Guest</strong>
                    }
                    {
                        context.isTokenExist &&
                        <strong className='icon-pd'>
                            { dashContext.userdata.username && dashContext.userdata.username }
                        </strong>
                    }
                </a>
                </div>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                {
                    myBookings &&
                    <li className="nav-item">
                        <a className="nav-link active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-airplane" viewBox="0 0 16 16">
                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
                        </svg> My Bookings
                        </a>
                    </li>
                }
                {
                    !myBookings &&
                    <li>
                        <a className="nav-link link-body-emphasis link-pointer" onClick={ activeMenuSetToBookingsHandler }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-airplane" viewBox="0 0 16 16">
                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"/>
                        </svg> My Bookings
                        </a>
                    </li>
                }
                {
                    myPassengers &&
                    <li>
                        <a className="nav-link active">
                            <i className="bi bi-people"></i> My Passengers
                        </a>
                    </li>
                }
                {
                    !myPassengers &&
                    <li>
                        <a className="nav-link link-body-emphasis link-pointer" onClick={ activeMenuSetToPassengersHandler }>
                            <i className="bi bi-people"></i> My Passengers
                        </a>
                    </li>
                }
                </ul>
                <hr />
                {
                    !context.isTokenExist &&
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li>
                            <a className="nav-link link-body-emphasis link-pointer" onClick={ onLoginHandler }>
                                <i className="bi bi-box-arrow-in-right"></i> Login
                            </a>
                        </li>
                    </ul>
                }
                {
                    context.isTokenExist &&
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li>
                            <a href="#" className="nav-link link-body-emphasis link-pointer" onClick={ onLogoutHandler }>
                                <i className="bi bi-power"></i> Logout
                            </a>
                        </li>
                    </ul>
                }
            </div>
        </>
    )
}

export default DashboardLeftSection;
