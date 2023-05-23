import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccessModal = ( modalState, setModalState ) => {

    const navigate = useNavigate();

    const onCloseModalHandler = () => {
        setModalState(false);
    };

    const onLoginHandler = () => {
        navigate('/login');
    };

    return (
            <div className='modal-container modal-full-h'>
                <div className='modal-content modal-style-1 flex-full-center'>
                    <div className='modal-panel text-center'>
                        <div className='flex-full-center flex-column'>
                            <h1 className="modal-title fs-5"> Registration Successful! </h1>
                            <p>You have successfully registered, you may now login.</p>
                        </div>
                        <button type="button" class="modal-btn btn btn-primary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ onLoginHandler }>Login</button>
                        <button type="button" class="modal-btn btn btn-secondary btn-md px-4 me-md-2 fw-bold mg-t-15" onClick={ onCloseModalHandler }>Close</button>
                    </div>
                </div>
            </div>
    )
}

export default RegistrationSuccessModal;
