import React from 'react';
import './Alert.css';

export default function Alert(): JSX.Element {
    return (
        <button className='alert'>
            Failed to subscribe, try again later!
        </button>
    )
}
