import CreateListingForm from '@/components/CreateListingForm';
import { createClient } from '@/utils/server';
import { redirect } from 'next/navigation';

import React from 'react';

export default async function CreateListing() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }
  return <CreateListingForm user={data.user} />;
}
