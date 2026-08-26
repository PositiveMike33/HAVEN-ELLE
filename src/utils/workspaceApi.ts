import { getAccessToken } from './firebaseAuth';

export const createGoogleMeet = async (): Promise<string | null> => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const res = await fetch('https://meet.googleapis.com/v2/spaces', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (data.meetingUri) {
      return data.meetingUri;
    }
    return null;
  } catch (error) {
    console.error('Error creating Google Meet:', error);
    return null;
  }
};

export const sendGoogleChatMessage = async (spaceName: string, messageText: string): Promise<boolean> => {
  const token = await getAccessToken();
  if (!token) return false;
  try {
    const res = await fetch(`https://chat.googleapis.com/v1/${spaceName}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: messageText }),
    });
    return res.ok;
  } catch (error) {
    console.error('Error sending Google Chat message:', error);
    return false;
  }
};

export const getGoogleChatSpaces = async (): Promise<{ name: string; displayName: string }[]> => {
  const token = await getAccessToken();
  if (!token) return [];
  try {
    const res = await fetch('https://chat.googleapis.com/v1/spaces', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.spaces || [];
  } catch (error) {
    console.error('Error listing Google Chat spaces:', error);
    return [];
  }
};

export const createGoogleForm = async (title: string, documentTitle: string): Promise<string | null> => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const res = await fetch('https://forms.googleapis.com/v1/forms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        info: {
          title,
          documentTitle,
        }
      }),
    });
    const data = await res.json();
    if (data.responderUri) {
      return data.responderUri;
    }
    return null;
  } catch (error) {
    console.error('Error creating Google Form:', error);
    return null;
  }
};

export const createCalendarEvent = async (summary: string, description: string, startTime: string, endTime: string): Promise<string | null> => {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary,
        description,
        start: { dateTime: startTime },
        end: { dateTime: endTime },
      }),
    });
    const data = await res.json();
    return data.htmlLink || null;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return null;
  }
};

export const getGoogleContacts = async (): Promise<any[]> => {
  const token = await getAccessToken();
  if (!token) return [];
  try {
    const res = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.connections || [];
  } catch (error) {
    console.error('Error getting Google Contacts:', error);
    return [];
  }
};
