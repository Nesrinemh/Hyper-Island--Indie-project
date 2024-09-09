'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function HousingListingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    room_size: '',
    available_from: '',
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
    };

    try {
      const { data, error } = await supabase
        .from('housing_listings')
        .insert([dataToSubmit]);

      if (error) throw error;

      console.log('Data inserted successfully:', data);
      router.push('/listings');
    } catch (error) {
      console.error('Error inserting data:', error.message);
      // Here you might want to set some state to show an error message to the user
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg'
    >
      <h2 className='text-2xl font-bold mb-6'>
        Create a New Housing Listing
      </h2>

      {/* Title input */}
      <div className='mb-4'>
        <label
          htmlFor='title'
          className='block text-sm font-medium text-gray-700'
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
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Description textarea */}
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          rows='3'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        ></textarea>
      </div>

      {/* Price input */}
      <div className='mb-4'>
        <label
          htmlFor='price'
          className='block text-sm font-medium text-gray-700'
        >
          Price
        </label>
        <input
          type='number'
          id='price'
          name='price'
          value={formData.price}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Location input */}
      <div className='mb-4'>
        <label
          htmlFor='location'
          className='block text-sm font-medium text-gray-700'
        >
          Location
        </label>
        <input
          type='text'
          id='location'
          name='location'
          value={formData.location}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Bedrooms, Bathrooms, Room Size inputs */}
      <div className='grid grid-cols-3 gap-4 mb-4'>
        {/* ... (bedrooms, bathrooms, room_size inputs) ... */}
      </div>

      {/* Available From input */}
      <div className='mb-4'>
        <label
          htmlFor='available_from'
          className='block text-sm font-medium text-gray-700'
        >
          Available From
        </label>
        <input
          type='date'
          id='available_from'
          name='available_from'
          value={formData.available_from}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Cover Image URL input */}
      <div className='mb-4'>
        <label
          htmlFor='cover_image'
          className='block text-sm font-medium text-gray-700'
        >
          Cover Image URL
        </label>
        <input
          type='text'
          id='cover_image'
          name='cover_image'
          value={formData.cover_image}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Detail Images URLs input */}
      <div className='mb-4'>
        <label
          htmlFor='detail_images'
          className='block text-sm font-medium text-gray-700'
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
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Rental From and Duration inputs */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        {/* ... (rental_from and rental_duration inputs) ... */}
      </div>

      {/* Address inputs */}
      <div className='mb-4'>
        <label
          htmlFor='adress'
          className='block text-sm font-medium text-gray-700'
        >
          Address
        </label>
        <input
          type='text'
          id='adress'
          name='adress'
          value={formData.adress}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* City and ZIP Code inputs */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        {/* ... (adress_city and adress_zip_code inputs) ... */}
      </div>

      {/* Maximum Tenants input */}
      <div className='mb-4'>
        <label
          htmlFor='maximum_tenant'
          className='block text-sm font-medium text-gray-700'
        >
          Maximum Tenants
        </label>
        <input
          type='number'
          id='maximum_tenant'
          name='maximum_tenant'
          value={formData.maximum_tenant}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>

      {/* Checkbox inputs */}
      <div className='flex items-center mb-4'>
        <input
          type='checkbox'
          id='pet_allowed'
          name='pet_allowed'
          checked={formData.pet_allowed}
          onChange={handleChange}
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
        />
        <label
          htmlFor='pet_allowed'
          className='ml-2 block text-sm text-gray-900'
        >
          Pets Allowed
        </label>
      </div>

      {/* ... (smoking_allowed and wheelchair_accessible checkboxes) ... */}

      {/* Submit button */}
      <div className='mt-6'>
        <button
          type='submit'
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Create Listing
        </button>
      </div>
    </form>
  );
}
