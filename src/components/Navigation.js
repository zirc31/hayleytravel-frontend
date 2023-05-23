import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../App';
import './Navigation.css';

const Navigation = () => {

    const context = useContext( AppContext );

  return (
    <>
        <header id='header' className='container-menu flex-full-center'>
            <section className='content-menu top-nav'>
                <div className='logo'>
                    <Link to="/">Hayley Travel</Link>
                </div>
                <input id='menu-toggle' type='checkbox' />
                <label className='menu-button-container'>
                    <div className='menu-button'></div>
                </label>
                <ul className='menu'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/flights">Flights</Link></li>
                    {
                        !context.isTokenExist &&
                        <li><Link to="/login">Login</Link></li>
                    }
                    {
                        !context.isTokenExist &&
                        <li><Link to="/register">Sign-up</Link></li>
                    }
                    {
                        context.isTokenExist &&
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    }
                </ul>
            </section>
        </header>
    </>
  )
}

export default Navigation
