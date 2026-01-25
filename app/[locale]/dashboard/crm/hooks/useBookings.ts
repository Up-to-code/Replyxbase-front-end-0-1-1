import { useState, useCallback, useEffect } from 'react';
import { Booking, BookingFormData } from '../types';
// Removed server actions - using mock functions
const mockGetBookings = async () => ({ bookings: [], currentPage: 1, totalPages: 1, totalItems: 0 });
const mockCreateBooking = async () => ({ success: true });
const mockUpdateBooking = async () => ({ success: true });
const mockDeleteBooking = async () => ({ success: true });
const mockUpdateBookingStatus = async () => ({ success: true });
const mockLogActivity = async () => ({ success: true });
import { useFilters } from './useFilters';

export const useBookings = (filters: ReturnType<typeof useFilters>) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock data - no backend calls
      const result = {
        bookings: [],
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
      };
      setBookings(result.bookings);
      setTotalPages(result.totalPages);
      
      // Adjust current page if out of bounds
      if (filters.currentPage > result.totalPages && result.totalPages > 0) {
        filters.setCurrentPage(result.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [
    filters.currentPage, 
    filters.searchTerm, 
    filters.statusFilter, 
    filters.serviceFilter, 
    filters.sortField, 
    filters.sortDirection,
    filters.setCurrentPage,
    filters.dynamicFilters
  ]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const refresh = useCallback(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCreateBooking = async (data: BookingFormData) => {
    const result = await mockCreateBooking();
    if (result.success) {
      refresh();
    }
    return result;
  };

  const handleUpdateBooking = async (id: string, data: BookingFormData) => {
    const result = await mockUpdateBooking();
    if (result.success) {
      refresh();
    }
    return result;
  };

  const handleDeleteBooking = async (id: string) => {
    // Optimistic update
    const previousBookings = [...bookings];
    setBookings(bookings.filter(b => b.id !== id));

    try {
      const result = await mockDeleteBooking();
      if (!result.success) {
        throw new Error('Failed to delete');
      }
      refresh(); // Refresh to ensure sync
      return result;
    } catch (error) {
      // Revert on failure
      setBookings(previousBookings);
      console.error('Delete failed:', error);
      return { success: false, error };
    }
  };

  const handleUpdateStatus = async (id: string, status: Booking['status']) => {
    // Optimistic update
    const previousBookings = [...bookings];
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));

    try {
      const result = await mockUpdateBookingStatus();
      if (!result.success) {
        throw new Error('Failed to update status');
      }
      // No need to refresh immediately if optimistic update worked, 
      // but good to sync eventually. For now, we trust the optimistic update.
      return result;
    } catch (error) {
      // Revert on failure
      setBookings(previousBookings);
      console.error('Status update failed:', error);
      return { success: false, error };
    }
  };

  const handleAddActivity = async (type: 'call' | 'email' | 'note' | 'meeting', content: string, relatedTo: 'booking' | 'customer', relatedId: string) => {
    const result = await mockLogActivity();
    if (result.success) {
      refresh();
    }
    return result;
  };

  return {
    bookings,
    isLoading,
    totalPages,
    refresh,
    createBooking: handleCreateBooking,
    updateBooking: handleUpdateBooking,
    deleteBooking: handleDeleteBooking,
    updateStatus: handleUpdateStatus,
    addActivity: handleAddActivity
  };
};
