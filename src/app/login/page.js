import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <div className='w-full max-w-md p-10 bg-gray-50 shadow-md rounded-lg'>
        <h1 className='text-3xl font-semibold mb-6 text-center p-6'>
          Login or Sign Up
        </h1>
        <form className='space-y-6 p-6' action='#' method='post'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email:
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Enter your email'
              aria-label='Email address'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password:
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Enter your password'
              aria-label='Password'
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 font-bold'>
            <button
              type='submit'
              className='w-full sm:w-auto py-2 px-4 bg-[#FDBE8B] text-black font-bold rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              formAction={login}
            >
              Log In
            </button>
            <button
              type='submit'
              className='w-full sm:w-auto py-2 px-4 bg-[#F1E3BD] text-black font-bold rounded-md shadow-sm hover:bg-[#FDBE8D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
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
