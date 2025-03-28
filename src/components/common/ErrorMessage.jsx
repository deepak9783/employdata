import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, onRetry, retryText = 'Try Again' }) => {
  return (
    <Alert variant="danger" className="my-3">
      <div className="d-flex justify-content-between align-items-center">
        <span>{message}</span>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn btn-sm btn-outline-danger"
          >
            {retryText}
          </button>
        )}
      </div>
    </Alert>
  );
};

export default ErrorMessage;

