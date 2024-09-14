import EditListingForm from '@/components/EditListingForm';
import { createClient } from '@/utils/server';
import { redirect } from 'next/navigation';

export default async function UpdateListingForm({ params }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return <EditListingForm params={params} user={data.user} />;
}
