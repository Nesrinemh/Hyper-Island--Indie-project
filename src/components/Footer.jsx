'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-black text-white py-10 mt-auto'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* For Tenants */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              For Tenants
            </h3>
            <ul className='space-y-2'>
              <li>
                <a href='/search' className='hover:text-gray-300'>
                  Search Apartments
                </a>
              </li>
              <li>
                <a
                  href='/tenant-guide'
                  className='hover:text-gray-300'
                >
                  Tenants Guide
                </a>
              </li>
              <li>
                <a
                  href='/rent-calculator'
                  className='hover:text-gray-300'
                >
                  Rent Calculator
                </a>
              </li>
              <li>
                <a
                  href='/moving-tips'
                  className='hover:text-gray-300'
                >
                  Moving Tips
                </a>
              </li>
            </ul>
          </div>

          {/* For Landlords */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>
              For Landlords
            </h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='/list-property'
                  className='hover:text-gray-300'
                >
                  List Your Property
                </a>
              </li>
              <li>
                <a
                  href='/landlord-resources'
                  className='hover:text-gray-300'
                >
                  Landlord Resources
                </a>
              </li>
              <li>
                <a href='/pricing' className='hover:text-gray-300'>
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href='/property-management'
                  className='hover:text-gray-300'
                >
                  Property Management
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/about' className='hover:text-gray-300'>
                  About Us
                </a>
              </li>
              <li>
                <a href='/careers' className='hover:text-gray-300'>
                  Careers
                </a>
              </li>
              <li>
                <a href='/press' className='hover:text-gray-300'>
                  Press
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:text-gray-300'>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/terms' className='hover:text-gray-300'>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href='/privacy' className='hover:text-gray-300'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/cookie-policy'
                  className='hover:text-gray-300'
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href='/accessibility'
                  className='hover:text-gray-300'
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-[#F0E4BE]'>
          <p className='text-center text-sm'>
            © {new Date().getFullYear()} Living&Co All rights
            reserved. Individual Final Project{' '}
            <a
              href='https://github.com/Nesrinemh'
              className='text-purple-200'
            >
              Nesrine H
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
