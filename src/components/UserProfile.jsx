'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('User data:', user);
    console.log('Profile image:', profileImage);
    // Reset form or show success message
  };

  return (
    <>
      <Head>
        <title>User Profile | Living&Co</title>
        <meta
          name='description'
          content='Update your user profile and information'
        />
      </Head>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>User Profile</h1>
        <form onSubmit={handleSubmit} className='max-w-lg'>
          <div className='mb-6'>
            <label
              htmlFor='profileImage'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Profile Photo
            </label>
            <div className='flex items-center space-x-4'>
              <div className='w-24 h-24 rounded-full overflow-hidden bg-gray-100'>
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt='Profile'
                    width={96}
                    height={96}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-400'>
                    No Image
                  </div>
                )}
              </div>
              <button
                type='button'
                onClick={() => fileInputRef.current.click()}
                className='px-4 py-2 bg-[#F0E3BE] text-black rounded-md hover:bg-[#C1FFB3]focus:outline-none focus:ring-2 focus:ring-[#C1FFB3]'
              >
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={user.firstName}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1FFB3]'
                required
              />
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={user.lastName}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1FFB3]'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1FFB3]'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Phone Number
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={user.phone}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1FFB3]'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 bg-[#F0E3BE] text-black rounded-md hover:bg-[#C1FFB3] focus:outline-none focus:ring-2 focus:ring-[#C1FFB3]'
          >
            Save Profile
          </button>
        </form>
      </div>
    </>
  );
}
