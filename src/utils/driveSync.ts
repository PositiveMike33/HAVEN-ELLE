import { getAccessToken } from './auth';

export const syncToGoogleDrive = async (appState: any) => {
  const token = await getAccessToken();
  if (!token) return;

  try {
    const fileName = 'haven_elle_backup.json';
    
    // First, check if the file exists in appDataFolder
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${fileName}'`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const searchData = await searchRes.json();
    const existingFile = searchData.files?.[0];

    const metadata = {
      name: fileName,
      parents: ['appDataFolder'],
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([JSON.stringify(appState)], { type: 'application/json' }));

    if (existingFile) {
      // Update existing
      await fetch(`https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=multipart`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
    } else {
      // Create new
      await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
    }
    console.log('Saved backup to Google Drive');
  } catch (err) {
    console.error('Failed to sync to Google Drive:', err);
  }
};

export const loadFromGoogleDrive = async (): Promise<any | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const fileName = 'haven_elle_backup.json';
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${fileName}'`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const searchData = await searchRes.json();
    const existingFile = searchData.files?.[0];

    if (!existingFile) return null;

    const fileRes = await fetch(`https://www.googleapis.com/drive/v3/files/${existingFile.id}?alt=media`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = await fileRes.json();
    console.log('Loaded backup from Google Drive');
    return data;
  } catch (err) {
    console.error('Failed to load from Google Drive:', err);
    return null;
  }
};
