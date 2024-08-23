import { supabase } from './supabase';

export async function getListings() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Error fetching listings:', error);
    throw new Error('Failed to fetch listings');
  }

  return listings;
}

export async function getListing(id) {
  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log('Error fetching listings:', error);
    throw new Error('Failed to fetch listings');
  }

  return listing;
}
