'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getListing, updateListing } from '@/utils/getListings';

export default function EditListingForm({ params, user }) {
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
    contact_email: '',
    contact_phone: '',
    highlights: [],
    user_id: '',
  });

  useEffect(() => {
    async function fetchListing() {
      const listing = await getListing(params.id);
      setFormData(listing);
    }
    fetchListing();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateListing(params.id, formData);
    router.push(`/listings/${params.id}`);
  };

  return (
    <div className='min-h-screen  py-12 px-4 sm:px-6 lg:px-8 font-sans'>
      <form
        onSubmit={handleSubmit}
        className='max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden'
      >
        <div className='px-8 py-6 '>
          <h2 className='text-3xl font-extrabold text-black'>
            Update a New Housing Listing
          </h2>
        </div>
        <div className='px-8 py-6 space-y-6'>
          {/* Title input */}
          <div>
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
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm   '
            />
          </div>

          {/* Description textarea */}
          <div>
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
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            ></textarea>
          </div>

          {/* Price and Location inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700'
              >
                Price
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <span className='text-gray-500 sm:text-sm'>
                    SEK
                  </span>
                </div>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className='pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
                />
              </div>
            </div>
            <div>
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
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Bedrooms, Bathrooms, Room Size inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div>
              <label
                htmlFor='bedrooms'
                className='block text-sm font-medium text-gray-700'
              >
                Bedrooms
              </label>
              <input
                type='number'
                id='bedrooms'
                name='bedrooms'
                value={formData.bedrooms}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='bathrooms'
                className='block text-sm font-medium text-gray-700'
              >
                Bathrooms
              </label>
              <input
                type='number'
                id='bathrooms'
                name='bathrooms'
                value={formData.bathrooms}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='room_size'
                className='block text-sm font-medium text-gray-700'
              >
                Room Size (sqft)
              </label>
              <input
                type='number'
                id='room_size'
                name='room_size'
                value={formData.room_size}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Cover Image URL input */}
          <div>
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
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* Detail Images URLs input */}
          <div>
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
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* Rental From and Duration inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='rental_from'
                className='block text-sm font-medium text-gray-700'
              >
                Available From
              </label>
              <input
                type='date'
                id='rental_from'
                name='rental_from'
                value={formData.rental_from}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='rental_duration'
                className='block text-sm font-medium text-gray-700'
              >
                Rental Duration (months)
              </label>
              <input
                type='number'
                id='rental_duration'
                name='rental_duration'
                value={formData.rental_duration}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Address inputs */}
          <div>
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
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
            />
          </div>

          {/* City and ZIP Code inputs */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='adress_city'
                className='block text-sm font-medium text-gray-700'
              >
                City
              </label>
              <input
                type='text'
                id='adress_city'
                name='adress_city'
                value={formData.adress_city}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='adress_zip_code'
                className='block text-sm font-medium text-gray-700'
              >
                ZIP Code
              </label>
              <input
                type='text'
                id='adress_zip_code'
                name='adress_zip_code'
                value={formData.adress_zip_code}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50'
              />
            </div>
          </div>

          {/* Maximum Tenants input */}
          <div>
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
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
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
          <div>
            <button
              type='submit'
              className='w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8C53FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200'
            >
              Update Listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
