import React from 'react';
import { getListings } from '@/utils/getListings';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import Head from 'next/head';

export default async function Listings() {
  noStore();
  const listings = await getListings();

  return (
    <>
      <Head>
        <title>Explore Homes | Your Company Name</title>
        <meta
          name='description'
          content='Discover a wide range of homes available for rent. Find your perfect living space with detailed listings and high-quality images.'
        />
        <meta
          name='keywords'
          content='home rentals, apartments, houses for rent, accommodation'
        />
        <link
          rel='canonical'
          href='https://yourwebsite.com/listings'
        />
      </Head>
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24'>
          <h1 className='text-3xl font-normal tracking-tight text-gray-900 mb-20 font-ClimateCrisis'>
            Explore homes
          </h1>

          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ListingCard({ listing }) {
  return (
    <Link href={`/listings/${listing.id}`} className='group'>
      <article className='flex flex-col h-full'>
        <div className='relative w-full h-64 overflow-hidden rounded-lg bg-gray-200'>
          <Image
            loading='lazy'
            src={listing.cover_image}
            alt={listing.title}
            width={400}
            height={300}
            className='absolute h-full w-full object-cover object-center group-hover:opacity-75'
          />
        </div>
        <div className='mt-4 flex-grow'>
          <h2 className='text-sm font-medium text-gray-700 capitalize'>
            {listing.location}
          </h2>
          <p className='mt-1 text-sm text-gray-500 line-clamp-2 uppercase'>
            {listing.title}
          </p>
          <p className='mt-1 text-sm font-medium text-gray-900'>
            {new Intl.NumberFormat('sv-SE', {
              style: 'currency',
              currency: 'SEK',
            }).format(listing.price)}{' '}
            / month
          </p>
          <div className='mt-1 flex items-center'>
            <StarIcon
              className='h-4 w-4 text-yellow-400'
              aria-hidden='true'
            />
            <p className='ml-1 text-sm text-gray-500'>
              4.5 <span className='sr-only'>out of 5 stars</span> (28
              reviews)
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
