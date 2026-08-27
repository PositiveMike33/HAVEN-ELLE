import { getIdToken } from './auth';

export const syncToCloudSQL = async (appState: any) => {
  const token = await getIdToken();
  if (!token) return;

  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ stateData: appState })
    });
    console.log('Saved backup to Cloud SQL');
  } catch (err) {
    console.error('Failed to sync to Cloud SQL:', err);
  }
};

export const loadFromCloudSQL = async (): Promise<any | null> => {
  const token = await getIdToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/state', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    console.log('Loaded backup from Cloud SQL');
    return data.state || null;
  } catch (err) {
    console.error('Failed to load from Cloud SQL:', err);
    return null;
  }
};
