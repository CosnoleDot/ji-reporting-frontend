import React from 'react';
import logo from '../assets/png/download3.png';
import { useState } from 'react';

import instance from '../api/instrance';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgetEmail, setForgetEmail] = useState('');
  const [errorResponse, setErrorResponse] = useState({ error: '' });
  const navigate = useNavigate();
  const handleSubmit = () => {
    instance
      .post('/user/login', { email: username, password: password })
      .then((res) => {
        navigate('/');

        localStorage.setItem('@token', res?.data?.data?.token);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        setErrorResponse({ error: message });
        console.log(error);
      });
  };
  const handleForget = (e) => {
    instance
      .post('/user/forget-password', { email: forgetEmail })
      .then((res) => {
        alert('successful');
      })
      .catch((error) => {
        alert('error');
      });
  };
  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg'>
        <div className='w-full flex items-center justify-center'>
          <img src='/logo.png' className='text-center' alt='LOGO' />
        </div>
        <form className='space-y-4'>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type='text'
              placeholder='Email Address'
              className='w-full input input-bordered input-primary'
            />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered input-primary'
            />
          </div>
          <a
            href='/'
            className='text-xs text-gray-600 hover:underline hover:text-blue-600'
          >
            Forget Password?
          </a>
          <div>
            <button className='btn btn-primary'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
