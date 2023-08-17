import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';

function Sign() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleAuth = async (data) => {
    try {
      if (isRegistering) {
        await auth.createUserWithEmailAndPassword(data.email, data.password);
        console.log('User registered successfully');
      } else {
        await auth.signInWithEmailAndPassword(data.email, data.password);
        console.log('User logged in successfully');
      }
      navigate('/createpoll');
    } catch (error) {
      console.error('Authentication error:', error);
      setError('email', { type: 'manual', message: 'Authentication failed' });
    }
  };

  return (
    <div className='bgland'>
    <div className="flex items-center justify-center min-h-screen backdrop-blur-sm">
      <div className="w-96 p-8 bg-white rounded-xl shadow-sm">
        <p className="mb-4 text-left">
          <Link to="/" className="text-blue-400 hover:text-blue-700">
            <FontAwesomeIcon icon={faChevronLeft} size="md" />
          </Link>
        </p>
        <div className="mb-4">
          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="text-md mr-4">
                {isRegistering ? 'Login' : 'Login'}
              </Switch.Label>
              <Switch
                checked={isRegistering}
                onChange={setIsRegistering}
                className={`${
                  isRegistering ? 'bg-blue-600' : 'bg-red-600'
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Toggle</span>
                <span
                  className={`${
                    isRegistering ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
              <Switch.Label className="text-md">
                {isRegistering ? 'Register' : 'Register'}
              </Switch.Label>
            </div>
          </Switch.Group>
        </div>
        <form onSubmit={handleSubmit(handleAuth)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-3 border rounded-lg ${
                errors.email ? 'border-red-500' : ''
              }`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-3 border rounded-lg ${
                errors.password ? 'border-red-500' : ''
              }`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Sign;
