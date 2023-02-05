import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import api from '../../api';
import Logo from '../../components/layout/Logo';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'error'>(
    'idle'
  );

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setFormState('loading');
      await login(username);
    } catch (error) {
      setFormState('error');
      toast.error('Something went wrong. Please try again.', {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <div className="vh-100 w-100 p-3 d-flex flex-column justify-content-center align-items-center">
      <div className="login-form h-75">
        <form onSubmit={handleFormSubmit}>
          <div className="d-block m-auto text-center">
            <Logo />
          </div>
          <div className="my-4">
            <label
              htmlFor="username-input"
              className="form-label fw-semibold text-royalgray"
            >
              Username
            </label>
            <input
              id="username-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              className="form-control"
              aria-describedby="username-help"
              required
              onInvalid={(event) => {
                event.currentTarget.setCustomValidity(
                  'Please enter your Coverflex username'
                );
              }}
              onInput={(event) => {
                event.currentTarget.setCustomValidity('');
              }}
            />
            <div id="username-help" className="form-text">
              Your Coverflex username
            </div>
          </div>
          <button type="submit" className="btn btn-royalorange w-100">
            Continue
            {formState === 'loading' ? (
              <span
                className="spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi-arrow-right ms-"></i>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
