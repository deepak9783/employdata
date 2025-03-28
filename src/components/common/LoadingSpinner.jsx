import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'md' }) => {
  const spinnerSize = {
    sm: 'sm',
    md: '',
    lg: 'lg'
  }[size];

  return (
    <div className="d-flex justify-content-center my-4">
      <Spinner 
        animation="border" 
        role="status"
        size={spinnerSize}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;

