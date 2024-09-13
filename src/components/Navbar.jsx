'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  UserCircleIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/client';
import { useRouter } from 'next/navigation';
import Logo from '../../public/logo.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkUserSession();
  }, [user]);

  async function checkUserSession() {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log(session);

    setIsLoggedIn(!!user);
  }

  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsLoggedIn(false);
      router.refresh();
    }
  }

  const guestNavigation = [{ name: 'Our Rent', href: '/' }];

  const authNavigation = [
    { name: 'Rent listing', href: '/my-listings' },
    { name: 'Add a new rent', href: '/create-listing' },
    { name: 'Messages', href: '/messages' },
  ];

  const navigation = isLoggedIn ? authNavigation : guestNavigation;

  return (
    <nav className='bg-[#F0E4BE] shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 md:h-24'>
          <div className='flex items-center'>
            <Link href='/' className='flex-shrink-0'>
              <Image
                src={Logo}
                alt='Living&Co logo'
                width={200}
                height={200}
                className='h-12 md:h-20 w-auto'
              />
            </Link>
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium'
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  href='/login'
                  className='text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium'
                >
                  Login / SignUp
                </Link>
              </>
            )}
          </div>

          <div className='flex items-center'>
            {isLoggedIn && (
              <>
                <button
                  type='button'
                  className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-3'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Open user menu</span>
                      <UserCircleIcon
                        className='h-8 w-8 text-gray-400'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={React.Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={signOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            )}

            <div className='flex items-center md:hidden'>
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className='sr-only'>Open main menu</span>
                {isMenuOpen ? (
                  <XIcon
                    className='block h-6 w-6'
                    aria-hidden='true'
                  />
                ) : (
                  <MenuIcon
                    className='block h-6 w-6'
                    aria-hidden='true'
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='block text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  href='/login'
                  className='block text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href='/signup'
                  className='block text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <a
                  href='#'
                  className='block text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </a>
                <a
                  href='#'
                  className='block text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </a>
                <a
                  href='#'
                  className='block text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2 text-base font-medium'
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
