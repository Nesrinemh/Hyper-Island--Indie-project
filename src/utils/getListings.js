import { supabase } from './supabase';

// GET ALL LISTINGS
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

// GET ONE LISTING BY ID
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

// DELETE ONE LISTING BY ID
export async function deleteListingById(id) {
  const { data: listing, error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);

  if (error) {
    console.log('Error fetching listings:', error);
    throw new Error('Failed to fetch listings');
  }

  return listing;
}

// UPDATE ONE LISTING
export async function updateListing(id, updatedData) {
  const { data, error } = await supabase
    .from('listings')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    console.log('Error updating listing:', error);
    throw new Error('Failed to update listing');
  }

  return data;
}

// GET ALL LISTING BY USER ID
export async function getListingsByUserId(userId) {
  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.log('Error fetching listings:', error);
    throw new Error('Failed to fetch listings');
  }

  return listing;
}
