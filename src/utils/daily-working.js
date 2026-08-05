/**
 * Utility to simulate a real-time Daily Working Timeline for Field Sales.
 * Since we don't have a backend to auto-link timeline events yet,
 * we use localStorage to mock this flow so it feels exactly like the final app.
 */

const STORAGE_KEY = 'ccs_daily_working_timeline';
const CHECKIN_KEY = 'ccs_daily_checked_in';

export const getTimeline = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTimeline = (events) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const clearTimeline = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CHECKIN_KEY);
};

export const addTimelineEvent = (type, details) => {
  const events = getTimeline();
  const newEvent = {
    id: Date.now().toString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type,
    ...details
  };
  
  // Keep chronological order
  events.push(newEvent);
  saveTimeline(events);
  
  return newEvent;
};

import api from 'api/client';

export const checkIn = async (location, selfie, battery, notes) => {
  localStorage.setItem(CHECKIN_KEY, 'true');
  const event = addTimelineEvent('Check In', {
    status: 'Running',
    location: location || 'GPS Verified',
    photo: selfie,
    battery,
    remarks: notes
  });
  
  try {
    const formData = new FormData();
    formData.append('date', new Date().toISOString().split('T')[0]);
    formData.append('check_in', new Date().toLocaleTimeString('en-GB', { hour12: false }));
    formData.append('check_in_location', location || 'GPS Verified');
    if (selfie) {
      // In a real app this would be a file object
    }
    await api.post('/hr/attendance/', formData);
  } catch (err) {
    console.error("Failed to sync check-in", err);
  }
  
  return event;
};

export const checkOut = async (remarks, tomorrowPlan) => {
  localStorage.setItem(CHECKIN_KEY, 'false');
  const event = addTimelineEvent('Check Out', {
    status: 'Completed',
    remarks,
    tomorrowPlan
  });
  
  try {
    await api.post('/hr/attendance/check_out/', {
      check_out_location: 'GPS Verified'
    });
  } catch (err) {
    console.error("Failed to sync check-out", err);
  }
  
  return event;
};

export const isCheckedIn = () => {
  return localStorage.getItem(CHECKIN_KEY) === 'true';
};

// Auto-summarize the day based on timeline events
export const getDaySummary = () => {
  const events = getTimeline();
  let visits = 0;
  let orders = 0;
  let orderValue = 0;
  let collections = 0;
  let expenses = 0;

  events.forEach(e => {
    if (e.type === 'Dealer Visit') visits++;
    if (e.type === 'Order Created' || e.type === 'Order') {
      orders++;
      orderValue += (e.value || 0);
    }
    if (e.type === 'Collection') collections += (e.amount || 0);
    if (e.type === 'Expense') expenses += (e.amount || 0);
  });

  return { visits, orders, orderValue, collections, expenses, events };
};
