'use client';

import React from 'react'
import CRM from './CRM'

// Mock data - no backend needed
const mockBookings: any[] = [];
const mockCustomers: any[] = [];

export default function CRMPage() {
  return (
    <CRM 
      initialBookings={mockBookings} 
      initialPagination={{
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
      }}
      initialCustomers={mockCustomers}
    />
  )
}