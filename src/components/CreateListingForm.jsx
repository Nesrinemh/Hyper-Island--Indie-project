'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';

function CreateListingForm({ user }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    room_size: '',
    cover_image: '',
    detail_images: [],
    rental_from: '',
    rental_duration: '',
    adress: '',
    adress_city: '',
    adress_zip_code: '',
    maximum_tenant: '',
    pet_allowed: false,
    smoking_allowed: false,
    wheelchair_accessible: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      price: parseInt(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      room_size: parseInt(formData.room_size),
      rental_duration: parseInt(formData.rental_duration),
      adress_zip_code: parseInt(formData.adress_zip_code),
      maximum_tenant: parseInt(formData.maximum_tenant),
      user_id: user.id,
    };

    try {
      const { data, error } = await supabase
        .from('listings')
        .insert([dataToSubmit]);

      if (error) throw error;

      console.log('Data inserted successfully:', data);
      router.push('/listings');
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  return (
    <div className='min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans bg-purple-100'>
      <form
        onSubmit={handleSubmit}
        className='max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden p-6'
      >
        <div className='px-8 py-6 bg-yellow-200'>
          <h2 className='text-3xl font-extrabold text-gray-700'>
            Create a New Housing Listing
          </h2>
        </div>
        <div className='px-8 py-6 space-y-6'>
          {/* Title input */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='mt-6 block w-full rounded-md border border-gray-700 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* Description textarea */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows='3'
              className=' block w-full rounded-md mt-6 border border-gray-700 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            ></textarea>
          </div>

          {/* Price and Location inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Price
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <span className='text-gray-500 sm:text-sm'>$</span>
                </div>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  min='0'
                  required
                  className='pl-7 mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Bedrooms, Bathrooms, Room Size inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div>
              <label
                htmlFor='bedrooms'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Bedrooms
              </label>
              <input
                type='number'
                id='bedrooms'
                name='bedrooms'
                value={formData.bedrooms}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='bathrooms'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Bathrooms
              </label>
              <input
                type='number'
                id='bathrooms'
                name='bathrooms'
                value={formData.bathrooms}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='room_size'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Room Size (sqft)
              </label>
              <input
                type='number'
                id='room_size'
                name='room_size'
                value={formData.room_size}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Cover Image URL input */}
          <div>
            <label
              htmlFor='cover_image'
              className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
            >
              Cover Image URL
            </label>
            <input
              type='text'
              id='cover_image'
              name='cover_image'
              value={formData.cover_image}
              onChange={handleChange}
              className='mt-6 border border-gray-700 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* Detail Images URLs input */}
          <div>
            <label
              htmlFor='detail_images'
              className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
            >
              Detail Images URLs (comma-separated)
            </label>
            <input
              type='text'
              id='detail_images'
              name='detail_images'
              value={formData.detail_images.join(',')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  detail_images: e.target.value.split(','),
                })
              }
              className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* Rental From and Duration inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='rental_from'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Available From
              </label>
              <input
                type='date'
                id='rental_from'
                name='rental_from'
                value={formData.rental_from}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='rental_duration'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                Rental Duration (months)
              </label>
              <input
                type='number'
                id='rental_duration'
                name='rental_duration'
                value={formData.rental_duration}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Address inputs */}
          <div>
            <label
              htmlFor='adress'
              className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
            >
              Address
            </label>
            <input
              type='text'
              id='adress'
              name='adress'
              value={formData.adress}
              onChange={handleChange}
              className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* City and ZIP Code inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='adress_city'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                City
              </label>
              <input
                type='text'
                id='adress_city'
                name='adress_city'
                value={formData.adress_city}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='adress_zip_code'
                className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
              >
                ZIP Code
              </label>
              <input
                type='text'
                id='adress_zip_code'
                name='adress_zip_code'
                value={formData.adress_zip_code}
                onChange={handleChange}
                className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Maximum Tenants input */}
          <div>
            <label
              htmlFor='maximum_tenant'
              className='block text-sm font-medium text-gray-700 p-2 bg-orange-300 border-none rounded-md'
            >
              Maximum Tenants
            </label>
            <input
              type='number'
              id='maximum_tenant'
              name='maximum_tenant'
              value={formData.maximum_tenant}
              onChange={handleChange}
              className='mt-6 border border-gray-700 block w-full rounded-md  shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* Checkbox inputs */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='pet_allowed'
                name='pet_allowed'
                checked={formData.pet_allowed}
                onChange={handleChange}
                className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
              />
              <label
                htmlFor='pet_allowed'
                className='ml-2 block text-sm text-gray-900'
              >
                Pets Allowed
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='smoking_allowed'
                name='smoking_allowed'
                checked={formData.smoking_allowed}
                onChange={handleChange}
                className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
              />
              <label
                htmlFor='smoking_allowed'
                className='ml-2 block text-sm text-gray-900'
              >
                Smoking Allowed
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='wheelchair_accessible'
                name='wheelchair_accessible'
                checked={formData.wheelchair_accessible}
                onChange={handleChange}
                className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
              />
              <label
                htmlFor='wheelchair_accessible'
                className='ml-2 block text-sm text-gray-900'
              >
                Wheelchair Accessible
              </label>
            </div>
          </div>

          {/* Submit button */}
          <div className='flex justify-center '>
            <button
              type='submit'
              className=' m-10 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8C53FF]'
            >
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateListingForm;
