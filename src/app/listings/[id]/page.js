import DisplayOneListing from '@/components/DisplayOneListing';
import { createClient } from '@/utils/server';
import { redirect } from 'next/navigation';

export default async function Listing({ params }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return <DisplayOneListing params={params} user={data?.user} />;
}
