import { createClient } from '@/utils/server';
import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: 'Living&Co - Find Your Dream Apartment',
  description:
    'Living&Co is your trusted partner in discovering the apartment of your dreams. We offer a wide range of apartments to suit your needs and preferences.',
  keywords: 'apartment, rental, living, housing, accommodation',
};

async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  return (
    <div className='min-h-screen bg-purple-300 p-4 md:p-8 lg:p-12'>
      <main className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-8'>
          <div className='w-full lg:w-1/2 space-y-8'>
            <div className=' p-6 rounded-lg text-right'>
              <h2 className=' font-semibold text-xl md:text-2xl lg:text-3xl'>
                Welcome to{' '}
                <span className=' bg-yellow-200 p-1'>Living&Co</span>{' '}
                , <br className='hidden sm:inline ' /> your trusted
                partner in discovering the apartment of your dreams.
              </h2>
            </div>
            <p className='md:text-lg lg:text-xl leading-relaxed bg-purple-200 p-4 rounded-sm'>
              Living&Co has been at the forefront of the housing
              industry since its inception. Our platform connects
              apartment seekers with their ideal living spaces, taking
              into account individual preferences and needs. We pride
              ourselves on our extensive database of properties,
              ranging from cozy studios to luxurious penthouses, all
              vetted to ensure they meet our high standards of quality
              and comfort. Our team of experienced professionals is
              dedicated to making your apartment hunting experience
              smooth and enjoyable. With Living&Co, finding your
              perfect home is just a click away.
            </p>
          </div>

          <div className='w-full lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-[80vh] relative'>
            <Image
              src='https://domos.us/wp-content/uploads/2019/12/Domos-CoLiving-Support-1024x1024.jpg'
              alt='Cozy apartment living room'
              layout='fill'
              objectFit='cover'
              className='rounded-md'
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
