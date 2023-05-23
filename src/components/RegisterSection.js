import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationSuccessModal from '../modal/RegistrationSuccessModal';
import axios from 'axios';
import './RegisterSection.css';


const RegisterSection = () => {

    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ hint, setHint ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ modalState, setModalState ] = useState(false);

    const onLoginHandler = () => {
        navigate('/login');
    };

    const registerHandler = (e) => {
        // clear error
        setErrorMessage('');

        e.preventDefault();

        if ( password === hint ) {
            setErrorMessage('Password hint should not be the same as your password.');
        } else {
            axios.post( 'http://localhost:8000/api/v1/user/register', { email, username, password, hint }).then( response => {
                console.log( response );
                console.log( response.headers );

                if( response.status === 201 ){
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setHint('');
                    setErrorMessage('');
                    // registration successful, display success modal.
                    setModalState(true);
                } else {
                    setErrorMessage(`Username or Email already registered!`);
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setHint('');
                }
            }).catch((error) => {
                setErrorMessage(`Username or Email already registered!`);
                setUsername('');
                setEmail('');
                setPassword('');
                setHint('');
            });
        }
    }

    return (
        <>
            <form className='reg-form' onSubmit={ registerHandler }>
                <div className="form-group">
                    <input
                        type="type"
                        className="form-control"
                        placeholder="Enter username"
                        value={ username }
                        onChange={ e => setUsername(e.target.value) }
                        required/>
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                        required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={ password }
                        onChange={ e => setPassword(e.target.value) }
                        required/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Input your password hint"
                        value={ hint }
                        onChange={ e => setHint(e.target.value) }
                        required/>
                </div>
                {
                    errorMessage > '' &&
                    <div className="form-group">
                        <div className="error-message" >{ errorMessage }</div>
                    </div>
                }
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-full-width">Register</button>
                </div>
                <div>
                    <p>
                        Have an account ? <span className="text-link-btn" onClick={ onLoginHandler }>Login</span> instead.
                    </p>
                </div>
            </form>
            {
                modalState &&
                <RegistrationSuccessModal value={ { modalState, setModalState } } />
            }
        </>
    )
}

export default RegisterSection;