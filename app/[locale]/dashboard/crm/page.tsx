import React from 'react'
import CRM from './CRM'
import { getBookings, getCustomers } from '@/app/actions/crm'

async function page() {
  const [bookingsData, customersData] = await Promise.all([
    getBookings(1, 10),
    getCustomers()
  ]);

  const customers = customersData.success ? customersData.data : [];

  return (
    <CRM 
      initialBookings={bookingsData.bookings || []} 
      initialPagination={{
        currentPage: bookingsData.currentPage || 1,
        totalPages: bookingsData.totalPages || 1,
        totalItems: bookingsData.totalItems || 0
      }}
      initialCustomers={customers}
    />
  )
}

export default page