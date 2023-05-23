import React from 'react'
import { useReducer, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const reducer = ( formState, action) => {
    switch( action.type ){
        case 'SET_PAX_ID':
            return {
                ...formState,
                paxId: action.payload
            };
        case 'SET_USER_ID':
            return {
                ...formState,
                userId: action.payload
            };
        case 'SET_FNAME':
            return {
                ...formState,
                firstName: action.payload
            };
        case 'SET_MNAME':
            return {
                ...formState,
                middleName: action.payload
            };
        case 'SET_LNAME':
            return {
                ...formState,
                lastName: action.payload
            };
        case 'SET_DOB':
            return {
                ...formState,
                dateOfBirth: action.payload
            };
        case 'SET_SEX':
            return {
                ...formState,
                sex: action.payload
            };
        case 'SET_ERR_MSG':
            return {
                ...formState,
                error: action.payload
            };
        case 'SET_ERR':
            return {
                ...formState,
                err: action.payload
            };
        default:
            return formState;
    }
}

const initialFormState = {
    paxId: '',
    userId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    sex: '',
    error: '',
    err: false
};

const AddPassengerModal = ( props ) => {

    const [ formState, dispatch ] = useReducer( reducer, initialFormState);

    const navigate = useNavigate();

    const context = useContext( AppContext );

    const addPaxHandler = (e) => {
        e.preventDefault();

        let addPaxData = {
            paxId: formState.paxId,
            userId: context.userData[0].id,
            firstName: formState.firstName,
            middleName: formState.middleName,
            lastName: formState.lastName,
            dateOfBirth: formState.dateOfBirth,
            sex: formState.sex
        };
        context.setPassengerData( passengerData => [...passengerData, addPaxData]);

    };

  return (
    <>
        <div className='full-width full-height-vh flex-full-center modal-over modal-bg-0'>
            <div className='modal-body flex-full-center'>
                <div className='content-body auto-wh'>
                    <div className='mg-b-10'>
                        <h5>Add Passenger:</h5>
                    </div>
                    <hr />
                    <form className='modal-form' onSubmit={ addPaxHandler }>
                        <div className="form-group">
                            <input
                                type="type"
                                className="form-control"
                                placeholder="Firstname"
                                value={ formState.firstName }
                                onChange={ e => dispatch({ type: 'SET_FNAME', payload: e.target.value }) }
                                required/>
                        </div>
                        <div className="form-group">
                            <input
                                type="type"
                                className="form-control"
                                placeholder="Middlename"
                                value={ formState.middleName }
                                onChange={ e => dispatch({ type: 'SET_MNAME', payload: e.target.value }) }
                                required/>
                        </div>
                        <div className="form-group">
                            <input
                                type="type"
                                className="form-control"
                                placeholder="Lastname"
                                value={ formState.lastName }
                                onChange={ e => dispatch({ type: 'SET_LNAME', payload: e.target.value }) }
                                required/>
                        </div>
                        <div className="input-group mg-b-15">
                            <div className='mg-r-15 flex-full-center'>
                                <label className="form-label">Date of Birth</label>
                            </div>
                            <span className="input-group-text"><i className="bi-calendar"></i></span>
                            <input
                                type="date"
                                className="form-control"
                                value={ formState.dateOfBirth }
                                onChange={ e => dispatch({ type: 'SET_DOB', payload: e.target.value }) }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-select"
                                placeholder="Sex"
                                value={ formState.sex }
                                onChange={ e => dispatch({ type: 'SET_SEX', payload: e.target.value }) }
                                required>
                                <option value="">Select Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <hr />
                        {
                            formState.err &&
                            <div className='mg-t-10 mg-b-10 flex-full-center'>
                                <small className='modal-error'> { formState.error } </small>
                            </div>
                        }
                        <button type="submit" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" >Add</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddPassengerModal;
