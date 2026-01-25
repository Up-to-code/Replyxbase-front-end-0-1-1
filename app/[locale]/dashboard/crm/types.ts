// Removed Prisma dependencies - using plain interfaces

export interface Customer {
  id: string;
  organizationId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
  notes?: string;
  loyaltyTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | null;
  preferences?: string[];
  totalBookings?: number;
  totalSpent?: number;
  lastVisit?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  customerId: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  customerId?: string;
  bookingId?: string;
  type: 'call' | 'email' | 'meeting' | 'note' | string;
  description: string;
  content?: string; // For display in activity log
  createdBy?: string; // User who created the activity
  relatedTo?: 'booking' | 'customer';
  relatedId?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  organizationId: string;
  customerId: string;
  customer: Customer;
  date: Date;
  startTime: string;
  endTime?: string;
  duration: number;
  people: number;
  serviceType: string;
  occasion?: string;
  specialRequests?: string;
  location?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  priority: 'normal' | 'high' | 'urgent';
  staffAssigned?: string;
  source: 'website' | 'phone' | 'walk-in' | 'referral' | 'social';
  activities?: Activity[];
  notes?: string;
  notesCount?: number;
  tags?: string[];
  rating?: number;
  price?: number;
  deposit?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingFormData {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    notes: string;
  };
  booking: {
    date: Date;
    startTime: string;
    duration: number;
    people: number;
    serviceType: string;
    occasion: string;
    specialRequests: string;
    location: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
    priority: 'normal' | 'high' | 'urgent';
    staffAssigned: string;
    notes: string;
    source: 'website' | 'phone' | 'walk-in' | 'referral' | 'social';
    tags: string[];
  };
}

export type CalendarView = 'month' | 'week' | 'day';
export type MainView = 'table' | 'calendar' | 'kanban';
export type SortField = 'date' | 'customer' | 'status' | 'service' | 'priority';
export type SortDirection = 'asc' | 'desc';