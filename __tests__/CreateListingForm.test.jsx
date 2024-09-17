import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateListingForm from './CreateListingForm';
import { supabase } from '@/utils/supabase';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the supabase client
jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(),
    })),
  },
}));

describe('CreateListingForm', () => {
  const mockUser = { id: 'user123' };

  beforeEach(() => {
    render(<CreateListingForm user={mockUser} />);
  });

  test('renders the form with all input fields', () => {
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bathrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Room Size/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Cover Image URL/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Detail Images URLs/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Available From/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Rental Duration/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZIP Code/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Maximum Tenants/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Pets Allowed/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Smoking Allowed/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Wheelchair Accessible/i)
    ).toBeInTheDocument();
  });

  test('updates form data when inputs change', () => {
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, {
      target: { value: 'New Listing' },
    });
    expect(titleInput.value).toBe('New Listing');

    const priceInput = screen.getByLabelText(/Price/i);
    fireEvent.change(priceInput, { target: { value: '1000' } });
    expect(priceInput.value).toBe('1000');

    const petsAllowedCheckbox =
      screen.getByLabelText(/Pets Allowed/i);
    fireEvent.click(petsAllowedCheckbox);
    expect(petsAllowedCheckbox).toBeChecked();
  });

  test('submits the form with correct data', async () => {
    const mockInsert = jest
      .fn()
      .mockResolvedValue({ data: {}, error: null });
    supabase.from().insert.mockImplementation(mockInsert);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Test Listing' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByLabelText(/Bedrooms/i), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByLabelText(/Pets Allowed/i));

    fireEvent.submit(screen.getByText(/Create Listing/i));

    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith([
        expect.objectContaining({
          title: 'Test Listing',
          price: 1000,
          bedrooms: 2,
          pet_allowed: true,
          user_id: 'user123',
        }),
      ]);
    });
  });

  test('handles form submission error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockInsert = jest.fn().mockResolvedValue({
      data: null,
      error: new Error('Submission failed'),
    });
    supabase.from().insert.mockImplementation(mockInsert);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Test Listing' },
    });
    fireEvent.submit(screen.getByText(/Create Listing/i));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error inserting data:',
        'Submission failed'
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
