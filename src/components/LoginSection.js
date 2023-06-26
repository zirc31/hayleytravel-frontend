import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import axios from 'axios';
import './LoginSection.css';

const endPointUrl = process.env.REACT_APP_ENDPOINT_URL;
// ${endPointUrl}

const LoginSection = () => {

    const navigate = useNavigate();

    const context = useContext( AppContext );

    const [ loginVia, setLoginVia ] = useState('username');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    if ( context.isTokenExist ) {
        setTimeout(() => {
            navigate('/dashboard');
        }, 500);
    }

    const toLoginViaHandler = () => {
        if ( loginVia === 'username' ) {
            setLoginVia('email');
            setUsername('');
            setErrorMessage('');
        } else {
            setLoginVia('username');
            setEmail('');
            setErrorMessage('');
        }
    }

    const onRegisterHandler = () => {
        navigate('/register');
    };

    const loginHandler = (e) => {

        // clear error
        setErrorMessage('');

        e.preventDefault();

        if ( loginVia === 'username' ) {
            axios.post( `${endPointUrl}/api/v1/user/login`, { username, password }).then( response => {
                console.log( response );
                console.log( response.headers );

                if( response.status === 200 ){
                    // save token from response to localStorage.
                    // localStorage.setItem('username', response.data.username );
                    // localStorage.setItem('email', response.data.email );
                    localStorage.setItem('token', response.data.token );
                    context.setIsTokenExist(true);
                    // context.setUserData(response.data.username);
                    context.setUserData([{
                        id: response.data.userId,
                        username: response.data.username
                    }]);
                    navigate('/dashboard');
                } else {
                    setErrorMessage(`Invalid credentials!`);
                }
            }).catch((error) => {
                setErrorMessage(`Invalid credentials!`);
            });
        } else {
            axios.post( `${endPointUrl}/api/v1/user/login`, { email, password }).then( response => {
                console.log( response );
                console.log( response.headers );
                if( response.status === 200 ){
                    localStorage.setItem('token', response.data.token );
                    context.setIsTokenExist(true);
                    context.setUserData([{
                        id: response.data.userId,
                        username: response.data.username
                    }]);
                    navigate('/dashboard');
                } else {
                    setErrorMessage(`Invalid credentials!`);
                }
            }).catch((error) => {
                setErrorMessage(`Invalid credentials!`);
            });
        }

        setUsername('');
        setEmail('');
        setPassword('');
    }

    if ( context.isTokenExist ) {
        // display nothing
        return (
            <>
            </>
        )
    } else {
        // if not logged in, display login form.
        return (
            <>
                <form onSubmit={ loginHandler }>
                    {
                        loginVia === 'username' &&
                        <div className="form-group">
                            <input
                                type="type"
                                className="form-control"
                                placeholder="Enter username"
                                value={ username }
                                onChange={ e => setUsername(e.target.value) }
                                required/>
                        </div>
                    }
                    {
                        loginVia === 'email' &&
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
                    }
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={ password }
                            onChange={ e => setPassword(e.target.value) }
                            required/>
                    </div>
                    {
                        errorMessage > '' &&
                        <div className="form-group">
                            <div className="error-message" >{ errorMessage }</div>
                        </div>
                    }
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-full-width">Login</button>
                    </div>
                    <div>
                        <p>
                            {
                            loginVia === 'username' &&
                            <span>Forgot your Username ? Login via <span className="text-link-btn" onClick={toLoginViaHandler}>Email</span></span>
                            }
                            {
                            loginVia === 'email' &&
                            <span>Forgot your Email ? Login via <span className="text-link-btn" onClick={toLoginViaHandler}>Username</span></span>
                            }
                            <br /> Don&rsquo;t have an account ? <span className="text-link-btn" onClick={ onRegisterHandler }>Sign up</span>
                        </p>
                    </div>
                </form>
            </>
        )
    }
}

export default LoginSection
