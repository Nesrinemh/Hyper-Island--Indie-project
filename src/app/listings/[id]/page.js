'use client';

import React, { useEffect, useState } from 'react';
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize,
  PawPrint,
  PencilIcon,
  StarIcon,
  Trash2Icon,
  Users,
} from 'lucide-react';
import { deleteListingById, getListing } from '@/utils/getListings';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Listing({ params }) {
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchListing() {
      try {
        const data = await getListing(params.id);
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListing();
  }, [params.id]);

  const handleDelete = async () => {
    if (
      window.confirm('Are you sure you want to delete this listing?')
    ) {
      await deleteListingById(params.id);
      router.push('/listings');
      router.refresh();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  const allImages = [listing?.cover_image, ...listing?.detail_images];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='relative w-full h-96 overflow-hidden rounded-lg bg-gray-200'>
              <Image
                src={allImages[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1} of listing`}
                width={200}
                height={200}
                className='absolute h-full w-full object-cover object-center'
              />
              <button
                onClick={prevImage}
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2'
              >
                <ChevronLeft className='h-6 w-6 text-gray-800' />
              </button>
              <button
                onClick={nextImage}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2'
              >
                <ChevronRight className='h-6 w-6 text-gray-800' />
              </button>
            </div>
            <div className='flex space-x-2 overflow-x-auto'>
              {allImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={200}
                  height={200}
                  className={`h-20 w-20 object-cover rounded-md cursor-pointer ${
                    index === currentImageIndex
                      ? 'ring-2 ring-indigo-500'
                      : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Image Section */}

          {/* Details Section */}
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 mb-2'>
              {listing.title}
            </h1>
            <div className='flex items-center mb-4'>
              <StarIcon className='h-5 w-5 text-yellow-400' />
              <p className='ml-1 text-sm text-gray-500'>
                4.5 (28 reviews)
              </p>
            </div>
            <div className='flex items-center text-sm text-gray-500 mb-4'>
              <MapPin className='h-5 w-5 mr-1' />
              <p>
                {listing.adress}, {listing.adress_city},{' '}
                {listing.adress_zip_code}
              </p>
            </div>
            <p className='text-3xl font-bold text-gray-900 mb-6'>
              ${listing.price}{' '}
              <span className='text-lg font-normal'>/ month</span>
            </p>

            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='flex items-center'>
                <BedDouble className='h-5 w-5 text-gray-400 mr-2' />
                <span>{listing.bedrooms} Bedrooms</span>
              </div>
              <div className='flex items-center'>
                <Bath className='h-5 w-5 text-gray-400 mr-2' />
                <span>{listing.bathrooms} Bathrooms</span>
              </div>
              <div className='flex items-center'>
                <Maximize className='h-5 w-5 text-gray-400 mr-2' />
                <span>{listing.room_size} sqft</span>
              </div>
              <div className='flex items-center'>
                <Users className='h-5 w-5 text-gray-400 mr-2' />
                <span>Max {listing.maximum_tenant} tenants</span>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Description
              </h3>
              <p className='text-gray-600'>{listing.description}</p>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Amenities
              </h3>
              <div className='grid grid-cols-2 gap-2'>
                {listing.pet_allowed && (
                  <div className='flex items-center'>
                    <PawPrint className='h-5 w-5 text-gray-400 mr-2' />
                    <span>Pets allowed</span>
                  </div>
                )}
                {listing.smoking_allowed && (
                  <div className='flex items-center'>
                    <Smoking className='h-5 w-5 text-gray-400 mr-2' />
                    <span>Smoking allowed</span>
                  </div>
                )}
                {listing.wheelchair_accessible && (
                  <div className='flex items-center'>
                    <Wheelchair className='h-5 w-5 text-gray-400 mr-2' />
                    <span>Wheelchair accessible</span>
                  </div>
                )}
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Availability
              </h3>
              <p>
                Available from:{' '}
                {new Date(listing.rental_from).toLocaleDateString()}
              </p>
              <p>Rental duration: {listing.rental_duration} months</p>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Contact Information
              </h3>
              <p>Email: {listing.contact_email}</p>
              <p>Phone: {listing.contact_phone}</p>
            </div>

            <div className='flex flex-col justify-center m-4 '>
              <Link
                className='mb-2'
                href={`/listings/${params.id}/edit`}
              >
                <button className='w-full flex text-lg items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition duration-300'>
                  <PencilIcon className='h-4 w-4 mr-2' />
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className='w-full flex text-lg items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition duration-300'
              >
                <Trash2Icon className='h-5 w-5 mr-2' />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
