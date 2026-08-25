import { getAccessToken } from './auth';

export const fetchGoogleContacts = async () => {
  const token = await getAccessToken();
  if (!token) throw new Error('No access token');
  
  const res = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!res.ok) throw new Error('Failed to fetch contacts');
  const data = await res.json();
  
  return data.connections || [];
};

export const createGoogleCalendarEvent = async (summary: string, description: string, startTime: string, endTime: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error('No access token');
  
  const event = {
    summary,
    description,
    start: { dateTime: startTime, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    end: { dateTime: endTime, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  };

  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
    method: 'POST',
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...event,
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      }
    }),
  });

  if (!res.ok) throw new Error('Failed to create calendar event');
  return res.json();
};

export const fetchGoogleCalendarEvents = async () => {
  const token = await getAccessToken();
  if (!token) throw new Error('No access token');

  const timeMin = new Date().toISOString();
  
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&maxResults=10&orderBy=startTime&singleEvents=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!res.ok) throw new Error('Failed to fetch calendar events');
  const data = await res.json();
  
  return data.items || [];
};
