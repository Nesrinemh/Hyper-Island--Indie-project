import React from 'react';
import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div
      className='flex items-center justify-center min-h-screen bg-cover bg-center'
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className='w-full max-w-md p-20 bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-100 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-white '>
          Login or Sign Up
        </h1>
        <form className='space-y-6' action='#' method='post'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-white'
            >
              Email:
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='mt-1 block w-full px-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm text-white placeholder-gray-300'
              placeholder='Enter your email'
              aria-label='Email address'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-white'
            >
              Password:
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='mt-1 block w-full px-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm text-white placeholder-gray-300'
              placeholder='Enter your password'
              aria-label='Password'
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 font-bold'>
            <button
              type='submit'
              className='w-full sm:w-auto py-2 px-4 bg-[#C1FFB3] text-black font-bold rounded-md hover:bg-opacity-90 transition duration-300'
              formAction={login}
            >
              Log In
            </button>
            <button
              type='submit'
              className='w-full sm:w-auto py-2 px-4 bg-[#F1E3BD] text-black font-bold rounded-md hover:bg-[#C1FFB3] transition duration-300'
              formAction={signup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
