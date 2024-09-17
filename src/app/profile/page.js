import React from 'react';
import { getListingsByUserId } from '@/utils/getListings';
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/utils/server';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/UserProfile';

export default async function Profile() {
  noStore();
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return <UserProfile />;
}
