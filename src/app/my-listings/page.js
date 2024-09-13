import React from 'react';
import { getListingsByUserId } from '@/utils/getListings';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function MyListing() {
  noStore();
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  const listings = await getListingsByUserId(data.user.id);

  return (
    <div className='bg-white h-screen'>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 mb-6'>
          My listings
        </h2>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className='group'
            >
              <div className='relative w-full h-64 overflow-hidden rounded-lg bg-gray-200'>
                <Image
                  src={listing.cover_image}
                  alt={listing.title}
                  width={200}
                  className='absolute h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-sm font-medium text-gray-700'>
                  {listing.location}
                </h3>
                <p className='mt-1 text-sm text-gray-500 truncate'>
                  {listing.title}
                </p>
                <p className='mt-1 text-sm font-medium text-gray-900'>
                  ${listing.price} / month
                </p>
                <div className='mt-1 flex items-center'>
                  <StarIcon className='h-4 w-4 text-yellow-400' />
                  <p className='ml-1 text-sm text-gray-500'>
                    4.5 (28)
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
